import { style } from "@vanilla-extract/css";

export const container = style({
  padding: 20,
  backgroundColor: "pink",
  fontSize: 50,
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

export const SideMenu = style({
  height: "100vh",
  width: "250px",
  backgroundColor: "#222222",
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  position: "fixed",
  alignContent: "center",
  borderRadius: "20px"
})

export const SideMenuItem = style({
  color: "#ffffff",
  margin: "10px 0",
  padding: "10px",
  cursor: "pointer",
  borderRadius: "4px",
  alignContent: "center",
  ":hover": {
    backgroundColor: "#444"
  },
})