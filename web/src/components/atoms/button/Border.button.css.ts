import {style} from "@vanilla-extract/css";
import {linearGradient} from "@/utils/linear-gradient/linearGradient";

// export const ButtonWrapper = style({
//   width: "240px",
//   height: "56px",
//   background: linearGradient(
//     {
//       colorStops: ["#173673", "#BF2A37"],
//       toDirection: 'to right',
//     }
//   ),
//   borderRadius: "9999px",
//   padding: "1px",
//   boxShadow: "-4px 7px 5px #000000",
//
//   "@media": {
//     // 画面幅が768px以下の場合
//     "(max-width: 768px)": {
//       fontSize: "14px",  // フォントサイズを縮小
//     },
//     // 画面幅が480px以下の場合
//     "(max-width: 480px)": {
//       fontSize: "12px",  // フォントサイズをさらに縮小
//     },
//   }
// })


export const ButtonWrapper = style({
  width: "240px",
  minWidth: "200px",
  height: "56px",
  display: "inline-block",
  padding: "1px",  // ボーダーを表現するためのパディング
  borderRadius: "9999px", // 丸角にする
  background: linearGradient({
    colorStops: ["#173673", "#BF2A37"], // グラデーション色
    toDirection: "to right",
  }),
  boxShadow: "-4px 7px 5px #000000",  // ボタンに影をつける
  
  "@media": {
    "(max-width: 768px)": {
      fontSize: "14px",
    },
    "(max-width: 480px)": {
      fontSize: "12px",
    },
  },
});

export const ButtonContent = style({
  width: "100%",
  height: "100%",
  fontFamily: "Arial, sans-serif",  // フォントをArialに設定
  fontSize: "16px",
  fontWeight: "normal",
  whiteSpace: "nowrap",
  color: "#FFF",
  cursor: "pointer",
  background: "#1F1F1F",  // 内側の背景色
  borderRadius: "9999px", // 丸角を適用
  border: "none",         // デフォルトの境界線を削除
  
  // Flexboxで中央揃え
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  
  transition: "opacity 0.3s ease",
  ":hover": {
    opacity: ".7",
  },
  
  "@media": {
    "(max-width: 768px)": {
      fontSize: "14px",
    },
    "(max-width: 480px)": {
      fontSize: "12px",
    },
  },
});


// export const ButtonContent = style({
//   width: "240px",
//   height: "56px",
//   fontFamily: "Arial",
//   fontSize: "16px",
//   fontWeight: "normal",
//   color: "#FFF",
//   cursor: "pointer",
//   background: "#1F1F1F",
//   borderRadius: "9999px",
//   transition: "background-color 0.3s ease",
//   ":hover": {
//     opacity: ".7",
//   },
//
//   display: "flex",  // Flexboxを使用して中央揃え
//   alignItems: "center",  // 垂直方向に中央揃え
//   justifyContent: "center",  // 水平方向に中央揃え
//
//   "@media": {
//     // 画面幅が768px以下の場合
//     "(max-width: 768px)": {
//       fontSize: "14px",  // フォントサイズを縮小
//     },
//     // 画面幅が480px以下の場合
//     "(max-width: 480px)": {
//       fontSize: "12px",  // フォントサイズをさらに縮小
//     },
//   }
// })