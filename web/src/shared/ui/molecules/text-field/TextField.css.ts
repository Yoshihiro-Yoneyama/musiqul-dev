import {style} from '@vanilla-extract/css'
import {color} from '@/shared/themes/color.css'
import {fontSize} from "@/shared/themes/fontSize.css";
import {lineHeight} from "@/shared/themes/lineHeight.css";
import {space} from "@/shared/themes/space.css";

export const container = style({
  border: '1px',
})

export const error = style({
  color: color.danger,
  fontSize: fontSize.s,
  display: 'block',
  lineHeight: lineHeight.m,
  marginTop: space.xs,
  whiteSpace: 'pre-line',
})

export const description = style({
  color: color.primary,
  fontSize: fontSize.s,
  lineHeight: lineHeight.l,
  display: 'block',
  marginTop: space.xs,
})

export const orientation = {
  horizontal: style({
    display: 'flex',
  }),
  vertical: style({
    display: 'flex',
    flexDirection: 'column'
  })
}

export const textArea = {
  border: 'solid 1px #ccc',
  width: '100%',
}

export const label = style({
  color: color.primary,
  fontSize: fontSize.l,
  fontWeight: 'bold',
  lineHeight: lineHeight.l,
  marginTop: space.xs,
  marginBottom: space.xs,
})