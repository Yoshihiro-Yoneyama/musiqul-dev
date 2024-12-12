import { createGlobalTheme } from "@vanilla-extract/css";

export const boxShadowTheme = {
  boxShadow: '0px 2px 6px 0px rgba(33, 23, 4, 0.20)',
}

type ThemeBoxShadow = typeof boxShadowTheme
export type BoxShadow = {
  [T in keyof ThemeBoxShadow]: keyof ThemeBoxShadow[T]
}

const boxShadow = createGlobalTheme(':root', boxShadowTheme)

export default boxShadow