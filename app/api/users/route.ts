import users from "@/data/users.json";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const limit = Number(searchParams.get("limit")) || 20;
  const skip = Number(searchParams.get("skip")) || 0;

  const paginatedUsers = users.users.slice(skip, skip + limit);

  return Response.json({
    users: paginatedUsers,
    total: users.users.length,
    skip,
    limit,
  });
}