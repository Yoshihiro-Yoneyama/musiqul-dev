import {style} from "@vanilla-extract/css";
import {color} from "@/shared/themes/color.css";
import {space} from "@/shared/themes/space.css";
import {fontSize} from "@/shared/themes/fontSize.css";

export const container = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: space.xs2,
  width: "280px",
})

export const titleContainer = style({
  display: "flex",
  alignItems: "center",
  gap: space.xs2,
  fontSize: fontSize.s,
  color: color.white1,
})

export const control = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "280px",
  height: "40px",
  padding: "0 12px",
  boxSizing: "border-box",
  background: color.fieldBg,
  color: color.white,
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: fontSize.m,
  ":hover": {backgroundColor: "rgba(31, 31, 31, 0.7)"},
})

export const placeholder = style({
  color: color.gray,
})

export const panel = style({
  position: "absolute",
  top: "calc(100% + 4px)",
  left: 0,
  width: "280px",
  boxSizing: "border-box",
  background: color.fieldBgLight,
  borderRadius: "4px",
  padding: space.xs2,
  display: "flex",
  flexDirection: "column",
  zIndex: 10,
  boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.4)",
})

export const option = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `${space.xs} ${space.s}`,
  background: "none",
  border: "none",
  color: color.white,
  cursor: "pointer",
  fontSize: fontSize.m,
  textAlign: "left",
  ":hover": {opacity: 0.7},
})
