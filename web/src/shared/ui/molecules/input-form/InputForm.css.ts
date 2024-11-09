import {style} from '@vanilla-extract/css';

export const formContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px', // 各要素間のスペース
})

export const titleContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px', // タイトルと必須マーク間のスペース
  fontSize: "14px",
})