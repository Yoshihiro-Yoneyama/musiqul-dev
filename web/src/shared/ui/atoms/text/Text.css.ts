import {styleVariants} from '@vanilla-extract/css'
import {fontSize} from "@/shared/themes/fontSize.css";
import {color} from "@/shared/themes/color.css";
import {fontWeight} from "@/shared/themes/fontWeight.css";
import {lineHeight} from "@/shared/themes/lineHeight.css";

export const sizes = styleVariants(fontSize, (size) => [
  {fontSize: size},
])

export const colors = styleVariants({
  main: {color: color.primary},
  white: {color: color.white},
  error: {color: color.danger}
})

export const weights = styleVariants(fontWeight, (weight) => [
  {fontWeight: weight}
])

export const height = styleVariants(lineHeight, (height) => [
  {lineHeight: height}
])