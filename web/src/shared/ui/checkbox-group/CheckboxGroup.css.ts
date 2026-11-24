import { style } from "@vanilla-extract/css";
import { vars } from "../theme";

export const options = style({
  display: "flex",
  flexWrap: "wrap",
  gap: `${vars.space["2"]} ${vars.space["4"]}`,
});

export const option = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space["1"],
  cursor: "pointer",
});

export const checkbox = style({
  width: "1.1rem",
  height: "1.1rem",
  accentColor: vars.color.primary,
});
