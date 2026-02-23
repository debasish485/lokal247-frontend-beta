import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  res.cookies.delete("auth_token");
  res.cookies.delete("auth_role");
  res.cookies.delete("worker_token");

  return res;
}
