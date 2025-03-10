/**
 * バリデーション対象のフィールド名
 */
export const fields = {
  songTitle: "曲名",
  artist: "アーティスト名",
  name: "募集名",
  genres: "ジャンル",
  deadline: "締切",
  requiredGenerations: "",
  requiredGenders: "",
  recruitedInstruments: "",
  memo: "メモ",
}

/**
 * フロントエンドバリデーションのエラーメッセージ
 */
export const validationErrorMessages = {
  songTitle: {
    maxLength: `${fields.songTitle}は500文字以内で入力してください`,
  },
  artist: {
    maxLength: `${fields.artist}は100文字以内で入力してください`,
  },
  name: {
    minLength: `${fields.name}は1文字以上で入力してください`,
    maxLength: `${fields.name}は100文字以内で入力してください`,
  },
  memo: {
    maxLength: `${fields.memo}は2000文字以内で入力してください`,
  },
}