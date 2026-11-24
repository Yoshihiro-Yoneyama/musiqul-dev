import { style } from "@vanilla-extract/css";
import { vars } from "../theme";

/** テキスト系の入力欄で共通の見た目（TextArea からも使う） */
export const control = style({
  width: "100%",
  padding: `${vars.space["2"]} ${vars.space["3"]}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.field,
  color: vars.color.text,
  selectors: {
    "&:focus-visible": { outline: `3px solid ${vars.color.focus}`, outlineOffset: "1px" },
    "&[aria-invalid='true']": { borderColor: vars.color.danger },
    "&:hover:not(:disabled)": { borderColor: vars.color.textMuted },
    "&:disabled": { opacity: 0.4 },
  },
});
