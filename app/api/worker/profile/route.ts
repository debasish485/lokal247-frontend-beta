import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

/* ================= GET PROFILE ================= */
export async function GET() {
  try {
    const cookieStore = await cookies(); // ✅ await added
    const token = cookieStore.get("worker_token")?.value;

    if (!token) {
      return NextResponse.json({ status: false }, { status: 401 });
    }

    const res = await fetch(`${BASE_URL}/api/worker/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept:"application/json",
      },
      cache: "no-store",
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });

  } catch (err) {
    console.error("GET profile failed:", err);
    return NextResponse.json({ status: false }, { status: 500 });
  }
}

/* ================= UPDATE PROFILE (POST) ================= */
export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies(); // ✅ await added
    const token = cookieStore.get("worker_token")?.value;

    if (!token) {
      return NextResponse.json({ status: false }, { status: 401 });
    }

    // ✅ MUST be formData (NOT req.json)
    const formData = await req.formData();

    const res = await fetch(`${BASE_URL}/api/worker/profile`, {
      method: "POST", // Laravel expects POST
      headers: {
        Authorization: `Bearer ${token}`,
        Accept:"application/json",
      },
      body: formData,
    });

    console.log("BASE_URL =", BASE_URL);
    console.log("API STATUS =", res.status);
    console.log("API CONTENT-TYPE =", res.headers.get("content-type"));

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });

  } catch (err) {
    console.error("POST profile failed:", err);
    return NextResponse.json(
      { status: false, message: "Profile update failed" },
      { status: 500 }
    );
  }
}
