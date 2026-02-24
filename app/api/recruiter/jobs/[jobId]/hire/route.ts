import { NextResponse,NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await context.params;
    const body = await req.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/recruiter/jobs/${jobId}/hire`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json(); // backend MUST return JSON

    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    console.error("Hire API error:", error);
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
