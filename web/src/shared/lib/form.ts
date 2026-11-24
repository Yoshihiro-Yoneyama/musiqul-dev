import { z } from "zod";

/** フィールド名ごとのエラーメッセージ（最初の 1 件だけ持つ） */
export type FieldErrors<T> = Partial<Record<keyof T & string, string>>;

/** zod の検証エラーを、フィールド名ごとの最初のメッセージに変換する */
export function toFieldErrors<T>(error: z.ZodError<T>): FieldErrors<T> {
  const result: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "");
    if (key !== "" && !(key in result)) result[key] = issue.message;
  }
  return result as FieldErrors<T>;
}
