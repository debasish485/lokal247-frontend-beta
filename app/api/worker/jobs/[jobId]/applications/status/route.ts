// app/worker/jobs/[jobId]/applications/status/route.js

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// ✅ POST → Update status
export async function POST(req:NextRequest, context: { params: Promise<{ jobId: string }> }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const jobId = await context.params; // extract jobId
    const body = await req.json();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/worker/jobs/${jobId}/applications/status`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.log("Worker status update error", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

// ✅ GET → Fetch status
export async function GET(req:NextRequest, context: { params: Promise<{ jobId: string }> }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const {jobId} = await context.params;

    // Call your backend API (here we assume GET works)
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/worker/jobs/${jobId}/applications/status`, {
      method: "GET", // must match your backend
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ message: err || "Failed to fetch status" }, { status: res.status });
    }

    const data = await res.json();

    return NextResponse.json({ status: true, data: data.data }, { status: 200 });
  } catch (error) {
    console.log("Worker status fetch error", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
