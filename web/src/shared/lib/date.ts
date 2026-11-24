const dateTimeFormatter = new Intl.DateTimeFormat("ja-JP", {
  dateStyle: "medium",
  timeStyle: "short",
});

/** 画面表示用の日時（例：2026/11/24 15:30） */
export function formatDateTime(date: Date): string {
  return dateTimeFormatter.format(date);
}

/** `<input type="datetime-local">` の value 形式（ローカル時刻の YYYY-MM-DDTHH:mm） */
export function toDateTimeLocalValue(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
