import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../theme";

const gapVariants = Object.fromEntries(
  Object.entries(vars.space).map(([key, value]) => [key, { gap: value }]),
) as Record<keyof typeof vars.space, { gap: string }>;

export const stack = recipe({
  base: { display: "flex", minWidth: 0 },
  variants: {
    direction: {
      column: { flexDirection: "column" },
      row: { flexDirection: "row", flexWrap: "wrap", alignItems: "center" },
    },
    gap: gapVariants,
    justify: {
      start: { justifyContent: "flex-start" },
      end: { justifyContent: "flex-end" },
      between: { justifyContent: "space-between" },
    },
  },
  defaultVariants: { direction: "column", gap: "4", justify: "start" },
});

export type StackVariants = NonNullable<RecipeVariants<typeof stack>>;
