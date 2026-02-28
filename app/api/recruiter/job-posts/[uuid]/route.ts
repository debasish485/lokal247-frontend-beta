import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ uuid: string }> }
) {
  const { uuid } = await params;
    console.log("BASE URL =", process.env.NEXT_PUBLIC_BASE_URL);

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    console.log("TOKEN =", token);
    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/job-posts/${uuid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ uuid: string }> }
) {
  const { uuid } = await params;

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/recruiter/job-posts/${uuid}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error: any) {
    console.error("Next.js PUT API error:", error);
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}