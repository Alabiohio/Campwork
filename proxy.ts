import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Allow these exact paths through — everything else redirects to Coming Soon
const ALLOWED_PATHS = [
  "/",
  "/favicon.ico",
  "/privacy",
  "/terms",
  "/about",
];

// Allow all paths that start with these prefixes (static assets, Next internals)
const ALLOWED_PREFIXES = [
  "/_next/",
  "/api/",
  "/assets/",
  "/public/",
];

// Next.js 16+ requires the export to be named `proxy` (was `middleware` before)
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow static Next.js internals and assets
  if (ALLOWED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  // Allow the coming soon page itself
  if (ALLOWED_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // Redirect everything else to the coming soon page
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  // Match all routes except Next.js internals and static files
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets/).*)"],
};
