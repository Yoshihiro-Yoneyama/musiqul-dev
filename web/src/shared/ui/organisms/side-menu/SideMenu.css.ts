import {style} from "@vanilla-extract/css";

export const SideMenu = style({
  height: "100vh",
  width: "16%",
  backgroundColor: "#1E1E1E",
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  position: "fixed",
  alignContent: "center",
  borderRadius: "20px"
})

export const SideMenuItem = style({
  display: "flex",
  justifyContent: "center",
  margin: "10px 0",
})

export const Title = style({
  color: "#FFFFFF"
})