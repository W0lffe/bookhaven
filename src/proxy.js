import { NextResponse } from "next/server";
import { jwt_secret } from "./app/passwd";
import jwt from "jsonwebtoken";

export function proxy(request) {

    const token = request.cookies.get("authToken")?.value;

    if (!token) {
        return NextResponse.redirect(
            new URL("/", request.url)
        );
    }

    try {
        jwt.verify(token, jwt_secret);
        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect(
            new URL("/", request.url)
        );
    }
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/library/:path*",
    ]
};