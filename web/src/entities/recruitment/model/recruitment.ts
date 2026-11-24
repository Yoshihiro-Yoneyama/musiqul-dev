/**
 * 募集（Recruitment）のモデル。
 * 列挙値と文字数の上限は API のドメインモデル（msq.musiqulapi.domain.model.collab.recruitment）に合わせる。
 */

export const INSTRUMENTS = [
  "VOCAL",
  "GUITAR",
  "ELECTRIC_BASE",
  "DRUM",
  "KEY_BOARD",
  "PIANO",
  "VIOLIN",
  "OTHER",
] as const;
export type Instrument = (typeof INSTRUMENTS)[number];

export const MUSIC_GENRES = ["ROCK", "J_POP", "ANIME", "JAZZ", "CLASSIC", "METAL", "OTHER"] as const;
export type MusicGenre = (typeof MUSIC_GENRES)[number];

export const GENERATIONS = ["TEEN", "TWENTIES", "THIRTIES", "FORTIES", "FIFTIES", "MORE_THAN_SIXTIES"] as const;
export type Generation = (typeof GENERATIONS)[number];

export const GENDER_REQUIREMENTS = ["MALE_ONLY", "FEMALE_ONLY", "OTHER"] as const;
export type GenderRequirement = (typeof GENDER_REQUIREMENTS)[number];

export const instrumentLabels: Record<Instrument, string> = {
  VOCAL: "ボーカル",
  GUITAR: "ギター",
  ELECTRIC_BASE: "ベース",
  DRUM: "ドラム",
  KEY_BOARD: "キーボード",
  PIANO: "ピアノ",
  VIOLIN: "バイオリン",
  OTHER: "その他",
};

export const musicGenreLabels: Record<MusicGenre, string> = {
  ROCK: "ロック",
  J_POP: "J-POP",
  ANIME: "アニメ",
  JAZZ: "ジャズ",
  CLASSIC: "クラシック",
  METAL: "メタル",
  OTHER: "その他",
};

export const generationLabels: Record<Generation, string> = {
  TEEN: "10代",
  TWENTIES: "20代",
  THIRTIES: "30代",
  FORTIES: "40代",
  FIFTIES: "50代",
  MORE_THAN_SIXTIES: "60代以上",
};

export const genderRequirementLabels: Record<GenderRequirement, string> = {
  MALE_ONLY: "男性のみ",
  FEMALE_ONLY: "女性のみ",
  OTHER: "その他",
};

export const RECRUITMENT_LIMITS = {
  nameMaxLength: 100,
  songTitleMaxLength: 500,
  artistMaxLength: 100,
  memoMaxLength: 2000,
  /** 1 楽器あたりの募集人数の上限（API は Short。画面では現実的な値に絞る） */
  instrumentCountMax: 99,
} as const;

/** 作成する募集の内容（オーナーはログイン中のプレイヤーとして API 側で決まる） */
export type NewRecruitment = {
  name: string;
  songTitle: string;
  artist: string;
  genres: MusicGenre[];
  ownerInstruments: Instrument[];
  /** 募集する楽器と人数（1 つ以上） */
  recruitedInstruments: Partial<Record<Instrument, number>>;
  requiredGenerations: Generation[];
  requiredGenders: GenderRequirement[];
  deadline: Date;
  memo: string;
};
