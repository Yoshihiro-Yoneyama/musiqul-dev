import { style } from "@vanilla-extract/css";
import { vars } from "../theme";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["1"],
  border: "none",
  margin: 0,
  padding: 0,
  minWidth: 0,
});

export const label = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space["2"],
  padding: 0,
  fontWeight: vars.font.weightBold,
  fontSize: vars.font.sizeSm,
});

export const required = style({
  fontSize: "0.75rem",
  fontWeight: vars.font.weightBold,
  color: vars.color.danger,
});

export const hint = style({
  margin: 0,
  fontSize: vars.font.sizeSm,
  color: vars.color.textMuted,
});

export const error = style({
  margin: 0,
  fontSize: vars.font.sizeSm,
  color: vars.color.danger,
});
