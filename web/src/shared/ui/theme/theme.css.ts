import { createGlobalTheme } from "@vanilla-extract/css";

/**
 * デザイントークン。色・余白・文字サイズなどは、各コンポーネントで値を直接書かずに vars を参照する。
 */
export const vars = createGlobalTheme(":root", {
  color: {
    background: "#f6f7fb",
    surface: "#ffffff",
    text: "#1d2433",
    textMuted: "#5b6475",
    border: "#d7dbe5",
    primary: "#4f46e5",
    primaryHover: "#4338ca",
    onPrimary: "#ffffff",
    danger: "#c62828",
    dangerSurface: "#fdecec",
    success: "#1b7f4b",
    successSurface: "#e7f6ee",
    focus: "#818cf8",
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
    card: "0 1px 3px rgba(29, 36, 51, 0.08), 0 1px 2px rgba(29, 36, 51, 0.04)",
  },
});
