import { NextResponse } from "next/server";
import { authenticate } from "./app/auth/auth";

export function proxy(request) {
    const token = request.cookies.get("authToken")?.value;
    const url = new URL(request.url);

    // 1. If the user is going to the login page, let them through regardless of token
    if (url.pathname === "/login") {
        // Check if they ALREADY have a valid token and should be redirected to dashboard
        if (token && authenticate(token)) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
        // If no token or invalid token, let them see the login page
        return NextResponse.next();
    }

    // 2. For all other routes (dashboard, library, etc.)
    if (!token) {
        // No token? Redirect to login (or home, but login is better for auth flow)
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // 3. Token exists, now check if it's actually valid
    if (authenticate(token)) {
        return NextResponse.next();
    } else {
        // Token exists but is invalid/expired? Redirect to login
    }
    return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
    matcher: [
        "/login",
        "/dashboard/:path*",
        "/library/:path*",
    ]
};