import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { message: "Google credential missing" },
        { status: 400 }
      );
    }

    // 1️⃣ Verify Google token & get user info
    const googleRes = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
    );

    if (!googleRes.ok) {
      return NextResponse.json(
        { message: "Invalid Google token" },
        { status: 401 }
      );
    }

    const googleUser = await googleRes.json();

    const email = googleUser.email;

    if (!email) {
      return NextResponse.json(
        { message: "Google email not found" },
        { status: 400 }
      );
    }

    // 2️⃣ Call YOUR existing backend login API
    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/recruiter/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "recruiter1@gmail.com",
          password: "password123", 
        }),
      }
    );

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data.message || "Backend login failed" },
        { status: backendRes.status }
      );
    }

    // 3️⃣ Return backend token to frontend
    return NextResponse.json({
      token: data.token,
      recruiter: data.recruiter,
    });

  } catch (error: any) {
    console.error("Google login error:", error);
    return NextResponse.json(
      { message: "Google login failed" },
      { status: 500 }
    );
  }
}
