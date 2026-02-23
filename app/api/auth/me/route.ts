import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const authToken = req.cookies.get("auth_token")?.value;
    const authRole = req.cookies.get("auth_role")?.value;

    const workerToken = req.cookies.get("worker_token")?.value;

    // 🧑‍💼 Recruiter logged in
    if (authToken && authRole === "recruiter") {
      return NextResponse.json({
        loggedIn: true,
        role: "recruiter",
      });
    }

    // 👷 Worker logged in (OTP)
    if (workerToken) {
      return NextResponse.json({
        loggedIn: true,
        role: "worker",
      });
    }

    // ❌ Not logged in
    return NextResponse.json({
      loggedIn: false,
      role: null,
    });
  } catch (err) {
    return NextResponse.json({
      loggedIn: false,
      role: null,
    });
  }
}
