import { clearCsrfToken, request } from "@/shared/api";

/** POST /api/logout。API の呼び出しに失敗しても、web 側のログイン状態は必ず消す */
export async function logout(): Promise<void> {
  try {
    await request("/api/logout", { method: "POST" });
  } finally {
    clearCsrfToken();
  }
}
