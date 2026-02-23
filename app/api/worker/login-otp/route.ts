import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(`${BASE_URL}/api/worker/login-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok || data.status === false) {
      return NextResponse.json(
        { status: false, message: data.message || "OTP login failed" },
        { status: res.status }
      );
    }

    // ✅ COOKIE SET
    const response = NextResponse.json({
      status: true,
      worker: data.worker,
    });

    response.cookies.set("worker_token", data.token, {
      httpOnly: true,
      secure:  process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { status: false, message: error.message || "Server error" },
      { status: 500 }
    );
  }
}
