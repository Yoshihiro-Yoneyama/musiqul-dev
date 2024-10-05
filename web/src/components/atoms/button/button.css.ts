import { style, createTheme, styleVariants } from "@vanilla-extract/css";

const [buttonThemeClass, buttonThemeVars] = createTheme({
  backgroundColor: "#007BFF",
  color: "#FFF",
  padding: "8px 16px",
  borderRadius: "4px",
  borderColor: "#007BFF"
});

const buttonBase = style({
  fontSize: "16px",
  fontWeight: "bold",
  border: "1px solid",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
});

const buttonVariants = styleVariants({
  primary: {
    backgroundColor: buttonThemeVars.backgroundColor,
    color: buttonThemeVars.color
  },
  secondary: {
    backgroundColor: "#6c757d",
    color: "#FFF",
  },
  success: {
    backgroundColor: "#28a745",
    color: "#FFF"
  },
  danger: {
    backgroundColor: "#dc3545",
    color: "#FFF"
  },
});

export { buttonBase, buttonVariants, buttonThemeClass }