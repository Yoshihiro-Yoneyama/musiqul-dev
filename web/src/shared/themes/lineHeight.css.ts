import {createGlobalTheme} from "@vanilla-extract/css";

export const lineHeight = createGlobalTheme(':root', {
  s: 'calc(1em)',
  m: 'calc(1em + 0.4rem)',
  l: 'calc(1em + 0.6rem)',
})