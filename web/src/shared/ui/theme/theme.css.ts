import { createGlobalTheme } from "@vanilla-extract/css";

/**
 * デザイントークン。色・余白・文字サイズなどは、各コンポーネントで値を直接書かずに vars を参照する。
 */
export const vars = createGlobalTheme(":root", {
  // 配色は旧実装のダークテーマ（#171719 / #1F1F22 / 青→赤のグラデーション）を踏襲する
  color: {
    background: "#171719",
    surface: "#1F1F22",
    /** 入力欄の背景（面より一段暗い） */
    field: "#141414",
    text: "#E5E5E7",
    textMuted: "#9C9CA3",
    border: "#2E2E33",
    /** リンク・選択中のメニュー・チェックボックスなどのアクセント */
    primary: "#4BBBD4",
    onPrimary: "#FFFFFF",
    gradientStart: "#173673",
    gradientEnd: "#BF2A37",
    danger: "#E5484D",
    dangerSurface: "rgba(192, 48, 58, 0.16)",
    success: "#4CAF7A",
    successSurface: "rgba(76, 175, 122, 0.16)",
    focus: "#4BBBD4",
  },
  gradient: {
    /** ボタンなどのブランドカラー（青→赤） */
    brand: "linear-gradient(to right, #173673, #BF2A37)",
  },
  space: {
    "0": "0",
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "5": "24px",
    "6": "32px",
    "7": "48px",
  },
  radius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
  },
  font: {
    family:
      '"Hiragino Sans", "Noto Sans JP", system-ui, -apple-system, "Segoe UI", sans-serif',
    sizeSm: "0.875rem",
    sizeMd: "1rem",
    sizeLg: "1.25rem",
    sizeXl: "1.5rem",
    weightRegular: "400",
    weightBold: "700",
    lineHeight: "1.6",
  },
  shadow: {
    card: "0 12px 32px rgba(0, 0, 0, 0.4)",
  },
});
