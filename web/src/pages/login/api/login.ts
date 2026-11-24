import { request, saveCsrfToken, type CsrfToken } from "@/shared/api";
import type { Credentials } from "../model/credentials";

/**
 * POST /api/login。成功するとセッションが作られ、以降のリクエストで使う CSRF トークンが返る。
 * 認証に失敗した場合は UnauthorizedError を投げる。
 */
export async function login(credentials: Credentials): Promise<void> {
  const csrf = await request<CsrfToken>("/api/login", {
    method: "POST",
    body: { loginId: credentials.email, password: credentials.password },
  });
  saveCsrfToken(csrf);
}
