import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/ui/theme";

export const root = style({
  display: "grid",
  placeItems: "center",
  minHeight: "100vh",
  padding: vars.space["4"],
});

export const card = style({ width: "100%", maxWidth: "24rem" });

export const brand = style({
  margin: 0,
  textAlign: "center",
  fontSize: vars.font.sizeXl,
  fontWeight: vars.font.weightBold,
  color: vars.color.text,
  selectors: {
    // 旧実装のログイン画面と同じく、ロゴの下にグラデーションの線を引く
    "&::after": {
      content: '""',
      display: "block",
      width: "48px",
      height: "4px",
      margin: `${vars.space["3"]} auto 0`,
      borderRadius: "2px",
      background: vars.gradient.brand,
    },
  },
});
