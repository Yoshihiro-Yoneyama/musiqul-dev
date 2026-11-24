import { NextResponse, type NextRequest } from "next/server";
import { CSRF_COOKIE_NAME } from "@/shared/api";
import { routes } from "@/shared/config";

/**
 * ログイン状態による画面の振り分け。
 * ログイン済みかどうかは、ログイン時に保存する CSRF トークンの Cookie の有無で判定する。
 * セッションが API 側で切れている場合は、API が 401 を返した時点で Cookie を消してログイン画面へ戻す。
 */
export function authProxy(request: NextRequest) {
  const isLoggedIn = request.cookies.has(CSRF_COOKIE_NAME);
  const isLoginPage = request.nextUrl.pathname === routes.login;

  if (!isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL(routes.login, request.url));
  }
  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL(routes.home, request.url));
  }
  return NextResponse.next();
}
