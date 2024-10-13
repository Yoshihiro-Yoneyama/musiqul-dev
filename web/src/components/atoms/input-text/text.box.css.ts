import { style } from '@vanilla-extract/css';

export const inputStyles = {
  default: style({
    fontSize: "16px",
    borderRadius: "4px",
    outline: "none",
    width: "100%",
  }),
  hover: style({
    transition: "opacity 0.7s ease",
  }),
  focused: style({
    transition: "opacity 0.7s ease",
    border: "1px solid #FFFFFF",
  }),
  active: style({
    transition: "opacity 0.2s ease",
  }),
  disabled: style({
    transition: "opacity 0.4s ease",
    cursor: "not-allowed",
  })
}