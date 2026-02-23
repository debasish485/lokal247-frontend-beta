// app/api/recruiter/register/route.ts
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; // backend base URL

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("📥 Incoming recruiter body from frontend:", body);
    console.log("🌍 Sending to backend URL:", `${BASE_URL}/api/recruiter/register`);

    // ✅ Send to real backend
    const res = await fetch(`${BASE_URL}/api/recruiter/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log("📡 Backend status:", res.status);

    // Read backend response as text first (to catch non-JSON errors)
    const text = await res.text();
    console.log("📡 Backend raw text:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("❌ Backend did not return JSON");
      return NextResponse.json(
        {
          status: false,
          message: "Backend returned non-JSON response",
          raw: text,
        },
        { status: 500 }
      );
    }

    console.log("✅ Backend parsed JSON:", data);

    // Backend returned error
    if (!res.ok || data.status === false) {
      return NextResponse.json(
        {
          status: false,
          message: data.message || "Recruiter registration failed",
          backend: data,
        },
        { status: res.status || 400 }
      );
    }

    // Success response + set cookie
    const nextRes = NextResponse.json(
      {
        status: true,
        message: data.message || "Recruiter registered successfully",
        data: data.data, // recruiter info + token from backend
      },
      { status: 200 }
    );

    // Set token cookie
    if (data.data?.token) {
      nextRes.cookies.set("auth_token", data.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
    }

    // Set role cookie
    nextRes.cookies.set("auth_role", "recruiter", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return nextRes;
  } catch (error: any) {
    console.error("🔥 route.ts error:", error);
    return NextResponse.json(
      { status: false, message: error.message || "Server error" },
      { status: 500 }
    );
  }
}
