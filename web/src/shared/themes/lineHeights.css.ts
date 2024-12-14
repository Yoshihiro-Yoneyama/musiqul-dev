import {createGlobalTheme} from "@vanilla-extract/css";

export const lineHeights = {
  s: 'calc(1em)',
  m: 'calc(1em + 0.4rem)',
  l: 'calc(1em + 0.6rem)',
}

type ThemeLineHeights = typeof lineHeights
export type LineHeight = {
  [T in keyof ThemeLineHeights]: keyof ThemeLineHeights[T]
}
const lineHeight
  = createGlobalTheme(':root', lineHeights)

export default lineHeight

