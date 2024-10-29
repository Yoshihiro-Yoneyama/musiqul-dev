import {style} from "@vanilla-extract/css";

export const headline1 = style({
  fontSize: "26px",
})

export const headline2 = style({
  fontSize: "20px",
  fontWeight: "bold",
})

export const itemsSetSideBySide = style({
  display: "flex",
  gap: '4%',
  margin: '4px 0 4px 0'
})

export const itemsSetVertical = style({
  display: "flex",
  flexDirection: "column",
  // margin: "0px 100px 0px 100px"
})