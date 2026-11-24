import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/ui/theme";

export const section = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["4"],
});

export const instrumentCounts = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(9rem, 1fr))",
  gap: vars.space["3"],
});
