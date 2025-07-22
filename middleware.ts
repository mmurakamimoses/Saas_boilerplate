// Note: Admin role checking and paid status checking must be handled server-side.
// Middleware only handles basic authentication checks due to Edge Runtime limitations

import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const sessionCookie = getSessionCookie(request);
    const { pathname } = request.nextUrl;

    // Define route arrays
    const protectedRoutes = ["/dashboard", "/admin", '/research'];
    const authRoutes = ["/login", "/signup"];

    // If user is not signed in and trying to access protected routes
    if (!sessionCookie && protectedRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/login?error=auth_required", request.url));
    }

    // If user is signed in and trying to access auth pages
    if (sessionCookie && authRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/dashboard?error=already_authenticated", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard", "/login", "/signup", "/admin", "/research"],
};