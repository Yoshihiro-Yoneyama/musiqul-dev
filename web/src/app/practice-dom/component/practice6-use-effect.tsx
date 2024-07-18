"use client";
import { useEffect, useState } from "react";

const UPDATE_CYCLE = 1000;

const KEY_LOCALE = "KEY_LOCALE";

enum LOCALE {
  US = "en-US",
  JP = "ja-JP"
}

const getLocaleFromString = (text: string) => {
  switch (text) {
    case LOCALE.US:
      return LOCALE.US;
    case LOCALE.JP:
      return LOCALE.JP;
    default:
      return LOCALE.US;
  }
}

export const Clock = () => {
  const [timestamp, setTimestamp] = useState<string | null>(null);
  const [locale, setLocale] = useState(LOCALE.US);

  // タイムスタンプの更新
  useEffect(() => {
    const timer = setInterval(() => {
      setTimestamp(new Date().toLocaleString(locale));
    }, UPDATE_CYCLE);

    return () => {
      clearInterval(timer);
    };
  }, [locale]);

  // ローカルストレージからロケールを取得
  useEffect(() => {
    const savedLocale = localStorage.getItem(KEY_LOCALE);
    if (savedLocale !== null) {
      setLocale(getLocaleFromString(savedLocale));
    }
    // 初回のタイムスタンプを設定
    setTimestamp(new Date().toLocaleString(locale));
  }, []);

  // ローカルストレージにロケールを保存
  useEffect(() => {
    localStorage.setItem(KEY_LOCALE, locale);
  }, [locale]);

  // if (timestamp === null) {
  //   return <div>Loading...</div>; // 初期レンダリング時のプレースホルダー
  // }

  return (
    <div>
      <p>
        <span id="current-time-label">現在時刻</span>
        <span>:{timestamp}</span>
        <select
          value={locale}
          onChange={(e) => setLocale(getLocaleFromString(e.target.value))}>
          <option value="en-US">en-US</option>
          <option value="ja-JP">ja-JP</option>
        </select>
      </p>
    </div>
  );
}
