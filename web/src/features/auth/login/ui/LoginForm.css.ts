import { style } from "@vanilla-extract/css";

export const form = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
});

export const field = style({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  width: "280px",
});

export const submit = style({
  width: "280px",
  marginTop: "8px",
});
