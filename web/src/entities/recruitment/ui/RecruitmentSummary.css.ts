import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/ui/theme";

export const list = style({
  display: "grid",
  gridTemplateColumns: "minmax(8rem, max-content) 1fr",
  gap: `${vars.space["3"]} ${vars.space["5"]}`,
  margin: 0,
  "@media": {
    "screen and (max-width: 600px)": { gridTemplateColumns: "1fr", gap: vars.space["1"] },
  },
});

export const term = style({
  fontWeight: vars.font.weightBold,
  fontSize: vars.font.sizeSm,
  color: vars.color.textMuted,
});

export const description = style({
  margin: 0,
  whiteSpace: "pre-wrap",
  overflowWrap: "anywhere",
  "@media": {
    "screen and (max-width: 600px)": { marginBottom: vars.space["3"] },
  },
});
