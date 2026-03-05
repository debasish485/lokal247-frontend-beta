import { NextResponse,NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await context.params;
    const body = await req.json(); 
    // body should contain: { application_id, status }

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const backendUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/recruiter/jobs/${jobId}/applications/status`;

    const res = await fetch(backendUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const text = await res.text();

    try {
      const data = JSON.parse(text);
      return NextResponse.json(data, { status: res.status });
    } catch {
      console.error("Backend returned non-JSON:", text);
      return NextResponse.json(
        { message: "Backend did not return JSON", raw: text },
        { status: 500 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
