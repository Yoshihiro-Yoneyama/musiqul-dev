/**
 * CSRF トークンの保存先。
 *
 * API はログイン成功時に `{ headerName, token }` を返し、以降の状態を変更するリクエスト
 * （POST / PUT / PATCH / DELETE）では `headerName` のヘッダーにトークンを付ける必要がある。
 * トークンは web 側のオリジンの Cookie に保存する。proxy（サーバー側）は
 * この Cookie の有無でログイン済みかどうかを判定する。
 */
export const CSRF_COOKIE_NAME = "msq_csrf";

export type CsrfToken = {
  headerName: string;
  token: string;
};

export function saveCsrfToken(csrf: CsrfToken): void {
  const value = encodeURIComponent(JSON.stringify(csrf));
  document.cookie = `${CSRF_COOKIE_NAME}=${value}; Path=/; SameSite=Lax`;
}

export function clearCsrfToken(): void {
  document.cookie = `${CSRF_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export function readCsrfToken(): CsrfToken | null {
  if (typeof document === "undefined") return null;
  const entry = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${CSRF_COOKIE_NAME}=`));
  if (!entry) return null;
  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(entry.slice(CSRF_COOKIE_NAME.length + 1)));
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "headerName" in parsed &&
      "token" in parsed &&
      typeof parsed.headerName === "string" &&
      typeof parsed.token === "string"
    ) {
      return { headerName: parsed.headerName, token: parsed.token };
    }
  } catch {
    // 壊れた値は未ログインとして扱う
  }
  return null;
}
