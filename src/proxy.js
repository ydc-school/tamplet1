// src/proxy.js

import { NextResponse } from "next/server";

export default async function proxy(request) {

    const host = request.headers.get("host") || "";
    const url = request.nextUrl;

    const hostname = host.split(":")[0];
    const parts = hostname.split(".");
    const subdomain = parts.length >= 2 ? parts[0] : null;


    if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/uploads/")) {

        const backendUrl = process.env.BACKEND_URL || "http://localhost:3000";
        const target = new URL(backendUrl);

        url.hostname = target.hostname;
        url.port = target.port || "3000";
        url.protocol = target.protocol;

        const reqHeaders = new Headers(request.headers);

        if (host) {
            reqHeaders.set("x-original-host", host);
            reqHeaders.set("x-forwarded-host", host);
        }

        if (subdomain) {
            reqHeaders.set("x-subdomain", subdomain);
        }

        return NextResponse.rewrite(url, {
            request: {
                headers: reqHeaders,
            },
        });
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/api/:path*", "/uploads/:path*", "/pages/:path*"],
};