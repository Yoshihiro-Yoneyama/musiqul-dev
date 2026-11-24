import {style} from "@vanilla-extract/css";
import {color} from "@/shared/themes/color.css";
import {space} from "@/shared/themes/space.css";
import {fontSize} from "@/shared/themes/fontSize.css";
import {fontWeight} from "@/shared/themes/fontWeight.css";

export const page = style({
  display: "flex",
  flexDirection: "column",
  gap: space.xl,
})

export const header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: space.m,
})

export const title = style({
  fontSize: fontSize.xl4,
  fontWeight: fontWeight.bold,
  color: color.white,
  margin: 0,
})

/** 「下書きを開く」ボタン内のアイコン+ラベル */
export const draftButtonInner = style({
  display: "inline-flex",
  alignItems: "center",
  gap: space.xs,
})
