import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isValidToken = token && token.userId && token.email;

  // 1️⃣ Redirect unauthenticated users
  if (!isValidToken && ["/admin", "/user", "/verification"].some(p => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 2️⃣ Redirect authenticated users away from auth or home
  if (isValidToken && (pathname === "/" || pathname.startsWith("/auth"))) {
    const redirectUrl = token.role === "ADMIN" ? "/admin" : "/";
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // 3️⃣ Prevent verified users from visiting verification
  if (token?.isVerified && pathname.startsWith("/verification")) {
    const redirectUrl = token.role === "ADMIN" ? "/admin" : "/";
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // 4️⃣ Prevent unverified users from accessing protected
  if (!token?.isVerified && isValidToken && (pathname.startsWith("/admin") || pathname.startsWith("/user"))) {
    return NextResponse.redirect(new URL("/verification", request.url));
  }

  // 5️⃣ Role-based access control
  if (isValidToken && token?.isVerified) {
    if (token.role === "ADMIN" && pathname.startsWith("/user")) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    if (token.role === "USER" && pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/user/:path*',
    '/auth/:path*',
    '/verification/:path*',
  ],
};
