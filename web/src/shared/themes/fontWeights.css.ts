import { createGlobalTheme } from "@vanilla-extract/css";

export const fontWeights = {
  regular: '400',
  bold: '700'
}

type ThemeFontWeights = typeof fontWeights
export type FontWeight = {
  [T in keyof ThemeFontWeights]: keyof ThemeFontWeights[T]
}

const fontWeight = createGlobalTheme(':root', fontWeights)
export default fontWeight