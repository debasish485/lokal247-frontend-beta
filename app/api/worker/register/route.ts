import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("📥 Incoming body from frontend:", body);
    console.log("🌍 Sending to backend URL:", `${BASE_URL}/api/worker/register`);

    const res = await fetch(`${BASE_URL}/api/worker/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log("📡 Backend status:", res.status);

    // 🔥 IMPORTANT: read as text first
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

    if (!res.ok || data.status === false) {
      return NextResponse.json(
        {
          status: false,
          message: data.message || "Registration failed",
          backend: data,
        },
        { status: res.status || 400 }
      );
    }

    return NextResponse.json(
      {
        status: true,
        message: data.message,
        data: data.data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("🔥 route.ts error:", error);

    return NextResponse.json(
      { status: false, message: error.message || "Server error" },
      { status: 500 }
    );
  }
}
