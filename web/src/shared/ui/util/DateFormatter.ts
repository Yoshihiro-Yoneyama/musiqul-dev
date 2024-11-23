import {DateValue} from "react-aria-components";

export const formatDate = (value: DateValue): string => {
  // タイムゾーンを指定して Date オブジェクトを作成
  const date = value.toDate('Asia/Tokyo');
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月は0始まりなので +1
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`; // yyyy-MM-dd形式
};