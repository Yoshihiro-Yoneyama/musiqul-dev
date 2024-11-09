import { style } from "@vanilla-extract/css";

export const Container = style({
  padding: "20px",
  backgroundColor: "pink",
  fontSize: "50px",
  color: "#fff",
});

export const BodyContainer = style({
  backgroundColor: "#000000"
})

export const FlexContainer = style({
  display: "flex",
  height: "100vh"
});

export const SideMenuContainer = style({
  width: "250px",
  padding: "20px"
})

export const ChildrenContainer = style({
  flex: "1",
  color: "#ffffff",
  padding: "100px"
})

