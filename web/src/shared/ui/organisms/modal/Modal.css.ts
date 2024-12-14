import { keyframes, style } from '@vanilla-extract/css'
import {space} from "@/shared/themes/space.css"
import {color} from "@/shared/themes/color.css";
import {boxShadow} from "@/shared/themes/boxShadow.css";
import {borderRadius} from "@/shared/themes/borderRadius.css";

const modalFade = keyframes({
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
})

const modalZoom = keyframes({
  '0%': {
    transform: 'scale(0.8)',
  },
  '100%': {
    transform: 'scale(1)',
  },
})

export const overlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vm',
  height: '100vh',
  backgroundColor: 'rgba(0 0 0 / .5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  selectors: {
    '&[data-entering]': {
      animation: `${modalFade} 200ms`,
    },
    '&[data-exiting]': {
      animation: `${modalFade} 150ms reverse ease-in`,
    },
  }
})

export const modal = style({
  boxShadow: boxShadow.boxShadow,
  borderRadius: borderRadius.l,
  color: color.black,
  outline: 'none',
  width: 'clamp(300px, 50%, 700px)',
  position: 'relative',
  selectors: {
    '&[data-entering]': {
      animation: `${modalZoom} 200ms cubic-bezier(0.175, 0.885, 0.32, 1.275)`,
    },}
})

export const closeButton = style({
  position: 'absolute',
  right: 0,
  top: 0,
  padding: space.s,
})