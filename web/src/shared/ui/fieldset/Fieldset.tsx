import { useId, type ReactNode } from "react";
import { RequiredMark } from "../field";
import * as styles from "../field/Field.css";

type FieldsetProps = {
  legend: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
};

/** 複数の入力をまとめた 1 つの項目（チェックボックスの組、楽器ごとの人数など） */
export function Fieldset({ legend, required, hint, error, children }: FieldsetProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(" ") || undefined;

  return (
    <fieldset className={styles.root} aria-describedby={describedBy} aria-invalid={error ? true : undefined}>
      <legend className={styles.label}>
        {legend}
        {required && <RequiredMark />}
      </legend>
      {children}
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
    </fieldset>
  );
}
