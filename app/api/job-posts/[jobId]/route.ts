import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(_req: Request, context: { params: Promise<{ jobId: string }> }) {
  // ✅ Await params before accessing
  const { jobId } = await context.params;
  console.log("Job ID:", jobId);

  try {
    // ✅ Get server-side token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    console.log("Token:", token);

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // ✅ Backend URL for job details
    const backendUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/job-posts/${jobId}`;
    console.log("Backend URL:", backendUrl);

    const res = await fetch(backendUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Backend fetch error:", text);
      return NextResponse.json(
        { message: "Failed to fetch job", error: text },
        { status: res.status }
      );
    }

    const data = await res.json();
    console.log("Backend data:", data);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Next.js API error:", error);
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
