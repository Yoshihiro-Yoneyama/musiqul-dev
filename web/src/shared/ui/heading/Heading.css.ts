import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../theme";

export const heading = recipe({
  base: { margin: 0, fontWeight: vars.font.weightBold, lineHeight: 1.3 },
  variants: {
    level: {
      1: { fontSize: vars.font.sizeXl },
      2: { fontSize: vars.font.sizeLg },
      3: { fontSize: vars.font.sizeMd },
    },
  },
});
