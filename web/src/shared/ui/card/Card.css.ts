import { style } from "@vanilla-extract/css";
import { vars } from "../theme";

export const card = style({
  padding: vars.space["5"],
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  boxShadow: vars.shadow.card,
});
