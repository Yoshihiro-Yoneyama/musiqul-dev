/** API が 2xx 以外を返したときのエラー */
export class HttpError extends Error {
  constructor(
    readonly status: number,
    readonly body: string,
  ) {
    super(`HTTP ${status}`);
    this.name = "HttpError";
  }
}

/** 未認証（ログインしていない、またはセッションが切れた） */
export class UnauthorizedError extends HttpError {
  constructor(body: string) {
    super(401, body);
    this.name = "UnauthorizedError";
  }
}

/** API に到達できなかった（ネットワークエラーなど） */
export class NetworkError extends Error {
  constructor(cause: unknown) {
    super("Network error", { cause });
    this.name = "NetworkError";
  }
}
