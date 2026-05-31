import {style} from '@vanilla-extract/css'
import {color} from '@/shared/themes/color.css'

export const datePicker = style({
  display: 'flex',
})



export const group = style({
  display: 'flex',
  width: 'fit-content',
  alignItems: 'center',
})

export const button = style({
//   background: 'var(--highlight-background)',
//   color: 'var(--highlight-foreground)',
//   border: '2px solid var(--field-background)',
//   forcedColorAdjust: 'none',
//   borderRadius: '4px',
//   marginLeft: '-1.929rem',
//   width: '1.429rem',
  height: '1.429rem',
//   padding: 0,
//   fontSize: '0.857rem',
//   boxSizing: 'content-box',
//   selectors: {
//     '&[data-pressed]': {
//       boxShadow: 'none',
//       background: 'var(--highlight-background)',
//     },
//     '&[data-focus-visible]': {
//       outline: '2px solid var(--focus-ring-color)',
//       outlineOffset: '2px',
//     },
//   },
})

export const dateInput = style({
  padding: '0 8px',
  display: 'flex',
  alignItems: 'center',
  boxSizing: 'border-box',
  width: '280px',
  height: '40px',
  borderRadius: '4px',
  color: color.white,
  background: color.fieldBg,
})

export const toggleButton = style({
  height: '40px',
  marginLeft: '-2rem',
  border: 'none',
  background: 'transparent',
  color: color.white,
  cursor: 'pointer',
})

export const popover = style({
  height: '56px',
})

export const calendar = style({
  display: 'flex',
  flexDirection: 'column',
  background: '#FFFFFF',
  color: '#000000',
})

export const header = style({
  display: 'flex',
  padding: '0 0.5rem',
  margin: '0'
})
