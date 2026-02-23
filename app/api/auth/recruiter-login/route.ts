import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const { token } = body;

    if (!token) {
        return NextResponse.json({ message: "Token missing" }, { status: 400 });
    }
    const res = NextResponse.json({
        success: true,
        role: "recruiter",
    });

    res.cookies.set("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    });

    res.cookies.set("auth_role", "recruiter", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    });

    return res;
}