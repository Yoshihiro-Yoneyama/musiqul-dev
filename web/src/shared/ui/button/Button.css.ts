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
    transition: "opacity 0.2s",
    selectors: {
      // 旧実装と同じく、状態は不透明度で表す（Hover 70% / Disabled 40%）
      "&:hover:not(:disabled)": { opacity: 0.7 },
      "&:focus-visible": { outline: `3px solid ${vars.color.focus}`, outlineOffset: "2px" },
      "&:disabled, &[aria-disabled='true']": { opacity: 0.4, cursor: "not-allowed" },
    },
  },
  variants: {
    variant: {
      /** グラデーションで塗りつぶしたボタン */
      primary: {
        background: vars.gradient.brand,
        color: vars.color.onPrimary,
        borderRadius: "9999px",
      },
      /** 枠線だけグラデーションのボタン */
      secondary: {
        background: `linear-gradient(${vars.color.field}, ${vars.color.field}) padding-box, ${vars.gradient.brand} border-box`,
        color: vars.color.text,
        borderRadius: "9999px",
      },
      ghost: {
        backgroundColor: "transparent",
        color: vars.color.textMuted,
      },
    },
    size: {
      md: { padding: `${vars.space["3"]} ${vars.space["6"]}`, fontSize: vars.font.sizeMd },
      sm: { padding: `${vars.space["1"]} ${vars.space["3"]}`, fontSize: vars.font.sizeSm },
    },
    fullWidth: {
      true: { width: "100%" },
    },
  },
  defaultVariants: { variant: "primary", size: "md" },
});

export type ButtonVariants = NonNullable<RecipeVariants<typeof button>>;
