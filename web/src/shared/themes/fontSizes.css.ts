import { createGlobalTheme } from "@vanilla-extract/css";

export const fontSizes = {
  xs: '12px',
  s: '14px',
  m: '16px',
  l: '18px',
  xl: '20px',
  xl2: '22px',
  xl3: '24px',
  xl4: '26px',
  xl5: '28px',
  xl6: '30px',
  xl7: '40px',
  huge: '80px',
}

type ThemeFontSizes = typeof fontSizes
export type FontSize = {
  [T in keyof ThemeFontSizes]: keyof ThemeFontSizes[T]
}

const fontSize = createGlobalTheme(':root', fontSizes)

export default fontSize