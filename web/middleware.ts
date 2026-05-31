import { NextRequest, NextResponse } from "next/server";
import { CSRF_TOKEN_NAME } from "./src/shared/api/csrf";

export function middleware(request: NextRequest) {
  const csrfToken = request.cookies.get(CSRF_TOKEN_NAME);
  if (!csrfToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!login|_next|favicon).*)"],
};
