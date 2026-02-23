import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 🔹 backend expects direct fields
    const {
      firebase_token,
      name,
      mobile_number,
      experience_level,
      expected_earning,
      weekly_hours,
      reason,
      main_category_id,
      subcategory_ids,
    } = body;

    // 🔹 check required fields
    if (!firebase_token || !name || !mobile_number) {
      return NextResponse.json(
        { status: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // 🔹 call actual backend register API
    const res = await fetch(`${BASE_URL}/api/worker/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        firebase_token,
        name,
        mobile_number,
        experience_level,
        expected_earning,
        weekly_hours,
        reason,
        main_category_id,
        subcategory_ids,
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.status) {
      return NextResponse.json(
        { status: false, message: data.message || "Registration failed" },
        { status: res.status }
      );
    }

    // 🔹 extract worker info
    const worker = {
      name: data.data.worker.name,
      mobile_number: data.data.worker.mobile_number,
      work: data.data.worker.work, // preferences / work info
    };

    const token = data.data.token;

    // 🔹 set cookie
    const response = NextResponse.json({ status: true, worker });
    response.cookies.set("worker_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
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
