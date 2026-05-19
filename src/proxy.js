import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const pathname = request.nextUrl.pathname;

  // Protect only:
  // /my-profile
  // /all-tiles/[id]

  const isProtected =
    pathname.startsWith("/my-profile") ||
    /^\/all-tiles\/[^/]+$/.test(pathname);

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/my-profile/:path*", "/all-tiles/:path*"],
};