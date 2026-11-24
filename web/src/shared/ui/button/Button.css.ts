import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../theme";

export const button = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: vars.space["2"],
    borderRadius: vars.radius.md,
    border: "1px solid transparent",
    fontWeight: vars.font.weightBold,
    textDecoration: "none",
    cursor: "pointer",
    transition: "background-color 0.15s, border-color 0.15s",
    selectors: {
      "&:focus-visible": { outline: `3px solid ${vars.color.focus}`, outlineOffset: "2px" },
      "&:disabled, &[aria-disabled='true']": { opacity: 0.55, cursor: "not-allowed" },
    },
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: vars.color.primary,
        color: vars.color.onPrimary,
        selectors: { "&:hover:not(:disabled)": { backgroundColor: vars.color.primaryHover } },
      },
      secondary: {
        backgroundColor: vars.color.surface,
        color: vars.color.text,
        borderColor: vars.color.border,
        selectors: { "&:hover:not(:disabled)": { borderColor: vars.color.textMuted } },
      },
      ghost: {
        backgroundColor: "transparent",
        color: vars.color.textMuted,
        selectors: { "&:hover:not(:disabled)": { color: vars.color.text } },
      },
    },
    size: {
      md: { padding: `${vars.space["2"]} ${vars.space["4"]}`, fontSize: vars.font.sizeMd },
      sm: { padding: `${vars.space["1"]} ${vars.space["3"]}`, fontSize: vars.font.sizeSm },
    },
    fullWidth: {
      true: { width: "100%" },
    },
  },
  defaultVariants: { variant: "primary", size: "md" },
});

export type ButtonVariants = NonNullable<RecipeVariants<typeof button>>;
