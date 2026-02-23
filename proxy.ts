import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Always ignore API routes
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const token = req.cookies.get("auth_token")?.value;
  const role = req.cookies.get("auth_role")?.value;

  // ✅ Allow auth pages
  if (
    pathname.startsWith("/auth") ||
    pathname.startsWith("/recruiter/auth")
  ) {
    return NextResponse.next();
  }

  // ✅ Recruiter protection
  if (pathname.startsWith("/recruiter")) {
    if (!token || role !== "recruiter") {
      return NextResponse.redirect(
        new URL("/recruiter/auth/signin", req.url)
      );
    }
  }

  // ✅ Worker protection
  if (pathname.startsWith("/dashboard")) {
    if (!token || role !== "worker") {
      return NextResponse.redirect(
        new URL("/auth/signin", req.url)
      );
    }
  }

  


  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/recruiter/:path*",
    "/worker/:path*",
  ],
};