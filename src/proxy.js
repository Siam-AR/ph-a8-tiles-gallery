import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request) {
  let session = null;
  
  try {
    // Convert Headers object to plain object for Better Auth
    const headersObj = Object.fromEntries(request.headers.entries());
    session = await auth.api.getSession({
      headers: headersObj,
    });
  } catch (error) {
    // Log the error but don't fail the request
    console.error("Session check error in proxy:", error);
    session = null;
  }

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