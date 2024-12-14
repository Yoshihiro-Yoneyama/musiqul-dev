import { createGlobalTheme } from "@vanilla-extract/css";

export const color = createGlobalTheme(':root', {
  primary: '#3f51b5',
  primaryDark: '#2c387e',
  primaryLight: '#6573c3',
  secondary: '#f50057',
  secondaryDark: '#ab003c',
  secondaryLight: '#f73378',
  border: '#cdced2',
  danger: '#ed1c24',
  linerGradientBlue: '#173673',
  linerGradientRed: '#BF2A37',
  gray: '#6b6b6b',
  black: '#000000',
  white: '#ffffff'
});
