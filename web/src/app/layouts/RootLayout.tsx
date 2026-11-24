import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../styles";

export const metadata: Metadata = {
  title: { default: "musiqul", template: "%s | musiqul" },
  description: "一緒に演奏する仲間を募集・参加できるサービス",
};

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
