'use client';

import { useSearchParams, useRouter } from 'next/navigation';

const ConfirmPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  if (!searchParams) {
    return <div>データがありません。フォームに戻ってください。</div>;
  }
  
  // クエリパラメータからデータを取得
  const songTitle = searchParams.get('songTitle') || '未設定';
  const artist = searchParams.get('artist') || '未設定';
  const genres = searchParams.get('genres') ? JSON.parse(searchParams.get('genres')!) : [];
  const memo = searchParams.get('memo') || '未設定';
  const recruitedInstruments = searchParams.get('recruitedInstruments')
    ? new Map(JSON.parse(searchParams.get('recruitedInstruments')!))
    : new Map();
  
  return (
    <div>
      <h1>確認画面</h1>
      <p>曲名: {songTitle}</p>
      <p>アーティスト名: {artist}</p>
      <p>ジャンル: {genres.join(', ')}</p>
      <p>メモ: {memo}</p>
      <p>
        募集する楽器:
        {Array.from(recruitedInstruments.entries())
          .map(([key, value]) => `${key}: ${value}`)
          .join(', ')}
      </p>
      <button onClick={() => router.back()}>戻る</button>
      <button onClick={() => console.log('送信処理')}>送信する</button>
    </div>
  );
};

export default ConfirmPage;
