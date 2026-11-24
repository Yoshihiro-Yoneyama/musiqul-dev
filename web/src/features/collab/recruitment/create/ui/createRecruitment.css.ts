import {style} from "@vanilla-extract/css";
import {color} from "@/shared/themes/color.css";
import {space} from "@/shared/themes/space.css";
import {fontSize} from "@/shared/themes/fontSize.css";
import {fontWeight} from "@/shared/themes/fontWeight.css";

/** フォーム全体（セクションを縦に並べる） */
export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: space.xl2,
})

/** 1セクション（見出し + 中身） */
export const section = style({
  display: "flex",
  flexDirection: "column",
  gap: space.m,
})

/** セクション見出し（赤系アンダーライン付き） */
export const sectionTitle = style({
  fontSize: fontSize.xl,
  fontWeight: fontWeight.bold,
  color: color.white,
  paddingBottom: space.xs,
  borderBottom: `1px solid ${color.accentRed}`,
})

/** セクション直下の補足文 */
export const helperText = style({
  fontSize: fontSize.s,
  color: color.white1,
})

/** 横並び（2カラム入力など） */
export const row = style({
  display: "flex",
  gap: space.xl2,
  flexWrap: "wrap",
})

/** 縦並びの入力グループ（ラベル + 入力 + エラー） */
export const field = style({
  display: "flex",
  flexDirection: "column",
  gap: space.xs2,
})

/** チェックボックス行（先頭にラベル列） */
export const checkRow = style({
  display: "flex",
  alignItems: "center",
  gap: space.m,
})

export const rowLabel = style({
  width: space.xl3,
  flexShrink: 0,
  fontSize: fontSize.s,
  color: color.white1,
})

export const checks = style({
  display: "flex",
  flexWrap: "wrap",
  gap: space.m,
  alignItems: "center",
})

/** 楽器（セレクタ + 人数 + 「人」） */
export const instrumentRow = style({
  display: "flex",
  alignItems: "flex-end",
  gap: space.s,
})

/** 「楽器を追加する」ボタン（背景なし） */
export const addButton = style({
  display: "inline-flex",
  alignItems: "center",
  gap: space.xs,
  background: "none",
  border: "none",
  cursor: "pointer",
  color: color.white1,
  fontSize: fontSize.s,
  padding: 0,
  ":hover": {opacity: 0.7},
})

/** エラーメッセージ枠（赤文字） */
export const errorSlot = style({
  minHeight: fontSize.l,
})

/** 下部のアクションボタン（中央寄せ） */
export const bottomActions = style({
  display: "flex",
  justifyContent: "center",
  gap: space.xl,
  marginTop: space.xl2,
})
