import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../theme";

export const alert = recipe({
  base: {
    margin: 0,
    padding: `${vars.space["3"]} ${vars.space["4"]}`,
    borderRadius: vars.radius.md,
    fontSize: vars.font.sizeSm,
  },
  variants: {
    tone: {
      error: { backgroundColor: vars.color.dangerSurface, color: vars.color.danger },
      success: { backgroundColor: vars.color.successSurface, color: vars.color.success },
    },
  },
});
