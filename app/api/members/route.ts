import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

// Map voice query IDs to choir role enums
const VOICE_MAP: Record<number, string> = {
  1: "soprano",
  2: "alto",
  3: "tenor",
  4: "bass",
  5: "musician",
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    // 1. Sanitize query parameters
    const limit = Math.min(Math.max(1, Number(searchParams.get("limit")) || 20), 100);
    const skip = Math.max(0, Number(searchParams.get("skip")) || 0);
    const search = searchParams.get("search")?.trim() || "";
    const voiceNumber = Number(searchParams.get("voiceNumber")) || 0;

    // 2. Construct dynamic WHERE clauses
    const filterConditions: string[] = ["is_active = true"];
    const filterValues: (string | number)[] = [];

    // Role filter
    if (voiceNumber in VOICE_MAP && voiceNumber !== 0) {
      filterValues.push(VOICE_MAP[voiceNumber]);
      filterConditions.push(`$${filterValues.length} = ANY(roles)`);
    }

    // Search filter (name, second_name, call_name)
    if (search) {
      filterValues.push(`%${search}%`);
      const paramIdx = filterValues.length;
      filterConditions.push(
        `(name ILIKE $${paramIdx} OR second_name ILIKE $${paramIdx} OR call_name ILIKE $${paramIdx})`
      );
    }

    const whereClause = filterConditions.length
      ? `WHERE ${filterConditions.join(" AND ")}`
      : "";

    // 3. Prepare parameters for paginated queries
    const paginationValues = [...filterValues, limit, skip];
    const limitParamIdx = paginationValues.length - 1;
    const offsetParamIdx = paginationValues.length;

    const dataQuery = `
      SELECT 
        id, 
        name, 
        second_name, 
        call_name, 
        robe_pastorale, 
        roles, 
        gender, 
        phone_number, 
        whatsapp_number, 
        facebook_link, 
        birthday,
        image_url
      FROM members
      ${whereClause}
      ORDER BY name ASC, second_name ASC
      LIMIT $${limitParamIdx} OFFSET $${offsetParamIdx};
    `;

    const countQuery = `SELECT COUNT(*)::int AS total FROM members ${whereClause};`;

    // 4. Execute queries concurrently
    const [membersResult, countResult] = await Promise.all([
      pool.query(dataQuery, paginationValues),
      pool.query(countQuery, filterValues),
    ]);

    return NextResponse.json({
      members: membersResult.rows,
      total: countResult.rows[0]?.total ?? 0,
      skip,
      limit,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    console.error("Database error in GET /api/members:", error);

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}