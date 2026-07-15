import users from "@/data/users.json";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const limit = Number(searchParams.get("limit")) || 20;
  const skip = Number(searchParams.get("skip")) || 0;
  const search = String(searchParams.get("search")?.toLowerCase().trim()) || "";

  const searchResults = users.users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(search);
  })

  const paginatedUsers = searchResults.slice(skip, skip + limit);

  return Response.json({
    users: paginatedUsers,
    total: users.users.length,
    skip,
    limit,
  });
}