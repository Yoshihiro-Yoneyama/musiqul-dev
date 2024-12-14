import { createGlobalTheme } from "@vanilla-extract/css";

export const borderRadiusTheme = {
  s: '4px',
  m: '8px',
  l: '12px',
  xl: '16px',
  round: '50%',
}

type ThemeBorderRadius = typeof borderRadiusTheme
export type BorderRadius = {
  [T in keyof ThemeBorderRadius]: keyof ThemeBorderRadius[T]
}

const borderRadius = createGlobalTheme(':root', borderRadiusTheme)

export default borderRadius