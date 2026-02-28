import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await context.params;
    console.log("Job ID from params:", jobId);

    const body = await req.json(); 
    console.log("Request body received:", body);

    const cookieStore = await cookies();
    const token = cookieStore.get("worker_token")?.value;
    console.log("Auth token from cookies:", token);

    if (!token) {
      console.log("No auth token found, returning 401");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const backendUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/worker/jobs/${jobId}/applications/status`;
    console.log("Backend URL:", backendUrl);

    const res = await fetch(backendUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    console.log("Backend response text:", text);

    try {
      const data = JSON.parse(text);
      console.log("Backend response parsed as JSON:", data);
      return NextResponse.json(data, { status: res.status });
    } catch (parseError) {
      console.error("Backend returned non-JSON:", text);
      return NextResponse.json(
        { message: "Backend did not return JSON", raw: text },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}