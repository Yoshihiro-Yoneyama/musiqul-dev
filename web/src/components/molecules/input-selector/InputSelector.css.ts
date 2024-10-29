import {style} from '@vanilla-extract/css';

export const selectorContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px'
})

export const titleContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '14px',
})