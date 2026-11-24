import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/ui/theme";

const mobile = "screen and (max-width: 768px)";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["5"],
  width: "14rem",
  flexShrink: 0,
  position: "sticky",
  top: 0,
  height: "100vh",
  padding: `${vars.space["5"]} ${vars.space["4"]}`,
  backgroundColor: vars.color.surface,
  borderRight: `1px solid ${vars.color.border}`,
  "@media": {
    [mobile]: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      height: "auto",
      zIndex: 1,
      padding: `${vars.space["3"]} ${vars.space["4"]}`,
      borderRight: "none",
      borderBottom: `1px solid ${vars.color.border}`,
    },
  },
});

export const brand = style({
  fontSize: vars.font.sizeLg,
  fontWeight: vars.font.weightBold,
  color: vars.color.text,
  textDecoration: "none",
});

export const nav = style({ flex: 1 });

export const navList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["1"],
  margin: 0,
  padding: 0,
  listStyle: "none",
  "@media": { [mobile]: { flexDirection: "row" } },
});

export const navLink = style({
  display: "block",
  padding: `${vars.space["2"]} ${vars.space["3"]}`,
  borderRadius: vars.radius.md,
  color: vars.color.text,
  textDecoration: "none",
  selectors: {
    "&:hover": { backgroundColor: vars.color.field },
    "&[aria-current='page']": {
      backgroundColor: vars.color.field,
      color: vars.color.primary,
      fontWeight: vars.font.weightBold,
    },
    "&:focus-visible": { outline: `3px solid ${vars.color.focus}`, outlineOffset: "1px" },
  },
});
