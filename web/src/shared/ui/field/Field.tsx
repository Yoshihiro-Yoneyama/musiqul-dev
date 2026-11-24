import { useId, type ReactNode } from "react";
import * as styles from "./Field.css";

/** 入力コントロールに渡す属性（ラベル・説明文・エラーとの関連付け） */
export type FieldControlProps = {
  id: string;
  "aria-describedby"?: string;
  "aria-invalid"?: true;
  required?: boolean;
};

type FieldProps = {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: (control: FieldControlProps) => ReactNode;
};

/**
 * 1 つの入力項目（ラベル・必須表示・説明文・エラーメッセージ）。
 * 入力コントロールは children の関数で受け取り、渡された属性をそのまま付ける。
 */
export function Field({ label, required, hint, error, children }: FieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={styles.root}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {/* 入力欄の required 属性で必須であることが読み上げられるため、表示上の印は読み上げない */}
        {required && <RequiredMark aria-hidden />}
      </label>
      {children({
        id,
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : undefined,
        required,
      })}
      {hint && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function RequiredMark({ "aria-hidden": ariaHidden }: { "aria-hidden"?: boolean }) {
  return (
    <span className={styles.required} aria-hidden={ariaHidden}>
      必須
    </span>
  );
}
