import { API_BASE_URL } from "@/shared/config";
import { clearCsrfToken, readCsrfToken } from "./csrf";
import { HttpError, NetworkError, UnauthorizedError } from "./errors";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestOptions = {
  method?: Method;
  /** JSON にシリアライズして送る値 */
  body?: unknown;
  signal?: AbortSignal;
};

const SAFE_METHODS: ReadonlySet<Method> = new Set(["GET"]);

/**
 * API を呼び出す。
 * - セッション Cookie を送るため `credentials: "include"` を付ける
 * - 状態を変更するメソッドには CSRF トークンのヘッダーを付ける
 * - 401 のときは保存している CSRF トークンを消して UnauthorizedError を投げる
 */
export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const method = options.method ?? "GET";
  const headers = new Headers({ Accept: "application/json" });
  if (options.body !== undefined) headers.set("Content-Type", "application/json");
  if (!SAFE_METHODS.has(method)) {
    const csrf = readCsrfToken();
    if (csrf) headers.set(csrf.headerName, csrf.token);
  }

  let response: Response;
  try {
    response = await fetch(new URL(path, API_BASE_URL), {
      method,
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      credentials: "include",
      signal: options.signal,
    });
  } catch (error) {
    throw new NetworkError(error);
  }

  if (response.status === 401) {
    clearCsrfToken();
    throw new UnauthorizedError(await response.text());
  }
  if (!response.ok) {
    throw new HttpError(response.status, await response.text());
  }
  const text = await response.text();
  return (text === "" ? undefined : JSON.parse(text)) as T;
}
