import { createGlobalTheme } from "@vanilla-extract/css";

export const color = createGlobalTheme(':root', {
  primary: '#3f51b5',
  primaryDark: '#2c387e',
  primaryLight: '#6573c3',
  secondary: '#f50057',
  secondaryDark: '#ab003c',
  secondaryLight: '#f73378',
  border: '#cdced2',
  danger: '#ed1c24',
  linerGradientBlue: '#173673',
  linerGradientRed: '#BF2A37',
  gray: '#6b6b6b',
  black: '#000000',
  white: '#ffffff',

  // --- ダークテーマ配色（スクリーンショット2のColor仕様）---
  // 状態（Hover70% / Active20% / Disabled40%）は各コンポーネントCSSで opacity 表現する
  // アクセント（エラー・強調）
  accentRed: '#c0303a',
  accentBlue: '#133a6b',
  accentBlueHover: '#4bbbd4',
  // 面（パネル・サイドバー・カード）
  surfacePanel: '#1a1a1a',
  // テキストフィールド背景
  fieldBg: '#1f1f1f',        // ノーマル
  fieldBgDark: '#141414',    // ダーク
  fieldBgLight: '#2a2a2a',   // ライト
  // 文字・ボタン背景（明）
  white1: '#cfcfcf',
});
