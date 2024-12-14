import { createGlobalTheme } from "@vanilla-extract/css";

export const spaces = {
  xs2: '4px',
  xs: '8px',
  s: '12px',
  m: '16px',
  l: '20px',
  xl: '24px',
  xl2: '32px',
  xl3: '40px',
  xl4: '48px',
  xl5: '56px',
  xl6: '64px',
  xl7: '72px',
}

type ThemeSpaces = typeof spaces
export type Space = {
  [T in keyof ThemeSpaces]: keyof ThemeSpaces[T]
}

const space = createGlobalTheme(':root', spaces)

export default space