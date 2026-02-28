import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ applicationId: string }> }
) {
  try {
  
    const cookieStore = await cookies();

    const recruiterToken = cookieStore.get("auth_token")?.value;
    const workerToken = cookieStore.get("worker_token")?.value;

  
    const token = workerToken || recruiterToken;

    console.log("TOKEN:", token);

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { applicationId } = await params;

    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/job-applications/${applicationId}/reviews`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await backendRes.json();

    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    console.log("Review submit error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}