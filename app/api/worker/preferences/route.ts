// app/api/worker/preferences/route.ts
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

/* ================= GET PREFERENCES ================= */
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("worker_token")?.value;

    if (!token) {
      return NextResponse.json({ status: false, message: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch(`${BASE_URL}/api/worker/preferences`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("GET preferences failed:", err);
    return NextResponse.json({ status: false, message: "Server error" }, { status: 500 });
  }
}

/* ================= SAVE / UPDATE PREFERENCES ================= */
export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("worker_token")?.value;

    if (!token) {
      return NextResponse.json({ status: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Use PUT here to update preferences in real backend
    const res = await fetch(`${BASE_URL}/api/worker/preferences`, {
      method: "PUT", // <-- important
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    console.log("Backend PUT response:", data); // optional debug log

    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("POST preferences failed:", err);
    return NextResponse.json({ status: false, message: "Server error" }, { status: 500 });
  }
}
