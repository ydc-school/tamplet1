import { NextResponse } from "next/server";
import { getSubdomain } from "./utils/getSubdomain";



export default async function proxy(request) {
  const host = request.headers.get("host") || "yaduvanshigroup.edu.in";
  const url = request.nextUrl;

  let subdomain = getSubdomain(host) || "main";

  console.log(subdomain)

  const reqHeaders = new Headers(request.headers);

  reqHeaders.set("x-subdomain", subdomain);

  if (host) {
    reqHeaders.set("x-original-host", host);
    reqHeaders.set("x-forwarded-host", host);
  }

  if (
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/uploads/")
  ) {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:3000";
    const target = new URL(backendUrl);

    url.hostname = target.hostname;
    url.port = target.port || "3000";
    url.protocol = target.protocol;

    return NextResponse.rewrite(url, {
      request: {
        headers: reqHeaders,
      },
    });
  }

  return NextResponse.next({
    request: {
      headers: reqHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|logo|poster|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$).*)",
  ],
};