import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

// Voice number mapping to your DB enum values
const VOICE_MAP: Record<number, string> = {
  1: "soprano",
  2: "alto",
  3: "tenor",
  4: "bass",
  5: "musician",
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const limit = Math.max(1, Number(searchParams.get("limit")) || 20);
    const skip = Math.max(0, Number(searchParams.get("skip")) || 0);
    const search = searchParams.get("search")?.trim() || "";
    const voiceNumber = Number(searchParams.get("voiceNumber")) || 0;

    // Build dynamic SQL constraints
    const conditions: string[] = ["is_active = true"];
    const values: (string | number)[] = [];

    // 1. Voice / Role Filter
    if ((voiceNumber in VOICE_MAP) && voiceNumber !== 0) {
      values.push(VOICE_MAP[voiceNumber]);
      conditions.push(`$${values.length} = role`);
    }

    // 2. Search Filter (matches name, second_name, or call_name)
    if (search) {
      values.push(`%${search}%`);
      const searchIdx = values.length;
      conditions.push(
        `(name ILIKE $${searchIdx} OR second_name ILIKE $${searchIdx} OR call_name ILIKE $${searchIdx})`
      );
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    // Query 1: Fetch paginated members
    values.push(limit, skip);
    const dataQuery = `
      SELECT 
        id, 
        name, 
        second_name, 
        call_name, 
        robe_pastorale, 
        role, 
        gender, 
        phone_number, 
        whatsapp_number, 
        facebook_link, 
        birthday,
        image_url
      FROM members
      ${whereClause}
      ORDER BY name ASC, second_name ASC
      LIMIT $${values.length - 1} OFFSET $${values.length};
    `;

    // Query 2: Get total filtered count for pagination metadata
    const countValues = values.slice(0, values.length - 2);
    const countQuery = `SELECT COUNT(*)::int AS total FROM members ${whereClause};`;

    const [membersResult, countResult] = await Promise.all([
      pool.query(dataQuery, values),
      pool.query(countQuery, countValues),
    ]);

    const total = countResult.rows[0]?.total || 0;

    return NextResponse.json(
      {
        members: membersResult.rows,
        total,
        skip,
        limit,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Database error in /api/members:", error); // <--- ADD THIS
    return NextResponse.json(
      { error: (error as Error).message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
