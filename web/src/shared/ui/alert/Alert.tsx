import type { ReactNode } from "react";
import { alert } from "./Alert.css";

type AlertProps = { tone: "error" | "success"; children: ReactNode };

/** 画面全体に関わるメッセージ（送信エラー、完了通知など） */
export function Alert({ tone, children }: AlertProps) {
  return (
    <div role={tone === "error" ? "alert" : "status"} className={alert({ tone })}>
      {children}
    </div>
  );
}
