import Link from "next/link";
import type { ComponentProps } from "react";
import { button, type ButtonVariants } from "./Button.css";

type ButtonProps = ComponentProps<"button"> & ButtonVariants;

export function Button({ variant, size, fullWidth, className, type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={[button({ variant, size, fullWidth }), className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & ButtonVariants;

/** ボタンの見た目をしたリンク（画面遷移だけを行う場合に使う） */
export function ButtonLink({ variant, size, fullWidth, className, ...props }: ButtonLinkProps) {
  return (
    <Link
      className={[button({ variant, size, fullWidth }), className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
