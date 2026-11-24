import { globalStyle } from "@vanilla-extract/css";
import { vars } from "@/shared/ui/theme";

globalStyle("*, *::before, *::after", { boxSizing: "border-box" });

// 日付ピッカーなどのブラウザ標準の部品もダークの配色で表示する
globalStyle("html", { colorScheme: "dark" });

globalStyle("html, body", { margin: 0, padding: 0 });

globalStyle("body", {
  minHeight: "100vh",
  backgroundColor: vars.color.background,
  color: vars.color.text,
  fontFamily: vars.font.family,
  fontSize: vars.font.sizeMd,
  lineHeight: vars.font.lineHeight,
});

globalStyle("a", { color: vars.color.primary });

globalStyle("input, textarea, select, button", { font: "inherit" });
