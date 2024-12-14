import { createGlobalTheme } from "@vanilla-extract/css";

export const fontWeight = createGlobalTheme(':root', {
  regular: '400',
  bold: '700'
})