import {style} from '@vanilla-extract/css';

export const inputStyles = {
  default: style({
    fontSize: "16px",
    borderRadius: "4px",
    border: "none",
    width: "280px",
    height: "40px",
    backgroundColor: "#1F1F1F",
  }),
  hover: style({
    backgroundColor: "rgba(31, 31, 31, 0.7)",
  }),
  focused: style({
    backgroundColor: "rgba(31, 31, 31, 0.7)",
    border: "1px solid #FFFFFF",
    color: "#FFFFFF",
  }),
  active: style({
    color: "#FFFFFF",
  }),
  disabled: style({
    backgroundColor: "rgba(31, 31, 31, 0.4)",
    cursor: "not-allowed",
  })
}