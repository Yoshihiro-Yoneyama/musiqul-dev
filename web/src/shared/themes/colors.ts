import { createGlobalTheme } from "@vanilla-extract/css";

export const colors = {
  primary: '#3f51b5',
  primaryDark: '#2c387e',
  primaryLight: '#6573c3',
  secondary: '#f50057',
  secondaryDark: '#ab003c',
  secondaryLight: '#f73378',
  border: '#cdced2',
  danger: '#ed1c24',
  gray: '#6b6b6b',
  black: '#000000',
  white: '#ffffff'
}

type ThemeColors = typeof colors
export type Color = {
  [T in keyof ThemeColors]: keyof ThemeColors[T]
}

const color = createGlobalTheme(':root', colors)

export default color