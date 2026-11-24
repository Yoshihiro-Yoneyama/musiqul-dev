import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/ui/theme";

export const root = style({
  display: "flex",
  minHeight: "100vh",
  "@media": { "screen and (max-width: 768px)": { flexDirection: "column" } },
});

export const main = style({
  flex: 1,
  minWidth: 0,
  maxWidth: "56rem",
  padding: `${vars.space["6"]} ${vars.space["5"]}`,
  "@media": { "screen and (max-width: 768px)": { padding: vars.space["4"] } },
});
