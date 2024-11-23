import {DateValue} from "react-aria-components";

export const formatDate = (value: DateValue): string => {
  // タイムゾーンを指定して Date オブジェクトを作成
  const date = value.toDate('Asia/Tokyo');
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月は0始まりなので +1
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`; // yyyy-MM-dd形式
};

export const formatDateToISO = (value: DateValue): string => {
  // DateValueをJavaScriptのDateオブジェクトに変換
  const date = value.toDate('UTC'); // タイムゾーンをUTCに指定
  return date.toISOString(); // ISO 8601形式 (例: 2024-11-30T00:00:00.000Z)
};