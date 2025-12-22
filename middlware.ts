
// import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // Get JWT token from request
//   const token = await getToken({
//     req: request,
//     secret: process.env.NEXTAUTH_SECRET,
//   });

//   const isValidToken = token && token.userId && token.email;

//   // 1️⃣ Redirect unauthenticated users from protected routes
//   if (
//     !isValidToken &&
//     (pathname.startsWith("/admin") || pathname.startsWith("/user") || pathname.startsWith("/verification"))
//   ) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   // 2️⃣ Redirect authenticated users away from auth pages or home
//   if (
//     isValidToken &&
//     (pathname === "/" || pathname.startsWith("/auth"))
//   ) {
//     const redirectUrl = token.isVerified
//       ? token.role === "ADMIN"
//         ? "/admin"
//         : "/user" // default role
//       : "/verification";
//     return NextResponse.redirect(new URL(redirectUrl, request.url));
//   }

//   // 3️⃣ Prevent verified users from accessing verification page
//   if (token?.isVerified && pathname.startsWith("/verification")) {
//     const redirectUrl = token.role === "ADMIN" ? "/admin" : "/user";
//     return NextResponse.redirect(new URL(redirectUrl, request.url));
//   }

//   // 4️⃣ Prevent unverified users from accessing protected routes
//   if (!token?.isVerified && isValidToken &&
//       (pathname.startsWith("/admin") || pathname.startsWith("/user"))
//   ) {
//     return NextResponse.redirect(new URL("/verification", request.url));
//   }

//   // 5️⃣ Role-based access control for verified users
//   if (isValidToken && token?.isVerified) {
//     if (token.role === "ADMIN" && pathname.startsWith("/user")) {
//       return NextResponse.redirect(new URL("/admin", request.url));
//     }
//     if (token.role === "USER" && pathname.startsWith("/admin")) {
//       return NextResponse.redirect(new URL("/user", request.url));
//     }
//   }

//   return NextResponse.next();
// }





import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("Middleware running for:", pathname);
  console.log("Token:", token);

  const isValidToken = token && token.userId && token.email;

  // 1️⃣ Redirect unauthenticated users
  if (!isValidToken && ["/admin", "/user", "/verification"].some(p => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 2️⃣ Redirect authenticated users away from auth or home
  if (isValidToken && (pathname === "/" || pathname.startsWith("/auth"))) {
    const redirectUrl = token.isVerified
      ? token.role === "ADMIN"
        ? "/admin"
        : "/user"
      : "/verification";
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // 3️⃣ Prevent verified users from visiting verification
  if (token?.isVerified && pathname.startsWith("/verification")) {
    const redirectUrl = token.role === "ADMIN" ? "/admin" : "/user";
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // 4️⃣ Prevent unverified users from accessing protected
  if (!token?.isVerified && isValidToken && (pathname.startsWith("/admin") || pathname.startsWith("/user"))) {
    return NextResponse.redirect(new URL("/verification", request.url));
  }

  // 5️⃣ Role-based access
  if (isValidToken && token?.isVerified) {
    if (token.role === "ADMIN" && pathname.startsWith("/user")) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    if (token.role === "USER" && pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/user", request.url));
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
