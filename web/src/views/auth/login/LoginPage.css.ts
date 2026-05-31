import { style } from "@vanilla-extract/css";
import { color } from "@/shared/themes/color.css";
import { linearGradient } from "@/shared/ui/util/linearGradient";

export const container = style({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px",
  backgroundColor: "#171719",
});

export const card = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "28px",
  padding: "48px 40px",
  backgroundColor: "#1F1F22",
  border: "1px solid #2E2E33",
  borderRadius: "16px",
  boxShadow: "0 12px 32px rgba(0, 0, 0, 0.4)",
  color: "#E5E5E7",
});

export const heading = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "12px",
});

export const title = style({
  margin: 0,
  fontSize: "28px",
  fontWeight: 700,
  color: "#F5F5F7",
});

export const accentBar = style({
  width: "48px",
  height: "4px",
  borderRadius: "2px",
  background: linearGradient({
    colorStops: [color.linerGradientBlue, color.linerGradientRed],
    toDirection: "to right",
  }),
});
