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
  backgroundColor: 'rgba(0 0 0 / .75)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 100,
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
  position: 'relative',
  borderRadius: borderRadius.l,
  background: color.white,
  outline: 'none',
  maxWidth: 500,
  padding: space.xl,
  selectors: {
     '&[data-entering]': {
       animation: `${modalZoom} 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)`,
     },
  }
})

export const closeButton = style({
  display: 'block',
  position: 'absolute',
  width: 40,
  height: 40,
  top: space.xs,
  right: space.xs,
  background: color.white,
  cursor: 'pointer',
  selectors: {
    '&::before, &::after': {
      content: '',
      position: 'absolute',
      borderRadius: borderRadius.s,
      top: '50%',
      left: '50%',
      background: color.primary,
      width: 4,
      height: 20,
    },
    '&::before': {
      transform: 'translate(-50%,-50%) rotate(45deg)',
    },
    '&::after': {
      transform: 'translate(-50%,-50%) rotate(-45deg)',
    },
  }
})