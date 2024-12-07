import { style, styleVariants} from "@vanilla-extract/css"
import  color  from "@/shared/themes/colors"
import lineHeight from "@/shared/themes/lineHeights";
import fontWeight, {fontWeights} from "@/shared/themes/fontWeights";
import fontSize from "@/shared/themes/fontSizes";

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