import type { ReactNode } from "react";
import { AppSidebar } from "@/widgets/app-sidebar";
import * as styles from "./MainLayout.css";

/** ログイン後の画面の共通レイアウト（サイドメニュー + 本文） */
export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.root}>
      <AppSidebar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
