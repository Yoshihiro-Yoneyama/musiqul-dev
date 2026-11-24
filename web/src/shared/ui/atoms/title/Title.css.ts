import {style, styleVariants} from '@vanilla-extract/css'
import {color} from '@/shared/themes/color.css'
import {lineHeight} from '@/shared/themes/lineHeight.css'
import {fontWeight} from '@/shared/themes/fontWeight.css'
import {fontSize} from '@/shared/themes/fontSize.css'

export const base = style({
  color: color.secondaryDark,
  fontWeight: fontWeight.bold,
  lineHeight: lineHeight.m,
  display: 'flex',
  alignItems: 'center',
})

export const types = styleVariants({
  page: {
    fontSize: fontSize.xl5,
  },
  section: {
    fontSize: fontSize.xl2
  },
  modal: {
    fontSize: fontSize.xl3,
    lineHeight: lineHeight.l
  }
})