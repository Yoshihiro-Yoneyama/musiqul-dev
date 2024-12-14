import { createGlobalTheme } from "@vanilla-extract/css";

export const borderRadius = createGlobalTheme(':root',{
  s: '4px',
  m: '8px',
  l: '12px',
  xl: '16px',
  round: '50%',
})