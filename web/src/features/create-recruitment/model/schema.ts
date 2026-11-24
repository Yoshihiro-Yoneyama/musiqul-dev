import { z } from "zod";
import {
  GENDER_REQUIREMENTS,
  GENERATIONS,
  INSTRUMENTS,
  MUSIC_GENRES,
  RECRUITMENT_LIMITS,
  type NewRecruitment,
} from "@/entities/recruitment";

const { nameMaxLength, songTitleMaxLength, artistMaxLength, memoMaxLength, instrumentCountMax } =
  RECRUITMENT_LIMITS;

const maxLength = (max: number, label: string) =>
  z.string().trim().max(max, { error: `${label}は${max}文字以内で入力してください` });

const countSchema = z
  .string()
  .trim()
  .transform((value) => (value === "" ? 0 : Number(value)))
  .pipe(
    z
      .number({ error: `人数は0〜${instrumentCountMax}の整数で入力してください` })
      .int({ error: `人数は0〜${instrumentCountMax}の整数で入力してください` })
      .min(0, { error: `人数は0〜${instrumentCountMax}の整数で入力してください` })
      .max(instrumentCountMax, { error: `人数は0〜${instrumentCountMax}の整数で入力してください` }),
  );

/** 募集作成フォームの入力値（FormData から取り出した文字列）を検証し、NewRecruitment に変換する */
export const recruitmentFormSchema = z.object({
  name: maxLength(nameMaxLength, "募集名").min(1, { error: "募集名を入力してください" }),
  songTitle: maxLength(songTitleMaxLength, "曲名"),
  artist: maxLength(artistMaxLength, "アーティスト"),
  genres: z.array(z.enum(MUSIC_GENRES)),
  ownerInstruments: z.array(z.enum(INSTRUMENTS)),
  recruitedInstruments: z
    .partialRecord(z.enum(INSTRUMENTS), countSchema)
    .refine((counts) => Object.values(counts).some((count) => (count ?? 0) > 0), {
      error: "募集する楽器の人数を1つ以上入力してください",
    }),
  requiredGenerations: z.array(z.enum(GENERATIONS)),
  requiredGenders: z.array(z.enum(GENDER_REQUIREMENTS)),
  deadline: z
    .string()
    .min(1, { error: "締め切りを入力してください" })
    .transform((value) => new Date(value))
    .refine((date) => !Number.isNaN(date.getTime()), { error: "締め切りの日時が正しくありません" })
    .refine((date) => date.getTime() > Date.now(), { error: "締め切りには未来の日時を入力してください" }),
  memo: maxLength(memoMaxLength, "メモ"),
}) satisfies z.ZodType<NewRecruitment, unknown>;

export type RecruitmentFormFields = z.input<typeof recruitmentFormSchema>;

/** フォームの name 属性。楽器ごとの人数は `recruitedInstruments.<楽器>` で送る */
export const recruitedInstrumentFieldName = (instrument: (typeof INSTRUMENTS)[number]) =>
  `recruitedInstruments.${instrument}`;

export function readRecruitmentForm(formData: FormData) {
  const text = (name: string) => String(formData.get(name) ?? "");
  const list = (name: string) => formData.getAll(name).map(String);
  return recruitmentFormSchema.safeParse({
    name: text("name"),
    songTitle: text("songTitle"),
    artist: text("artist"),
    genres: list("genres"),
    ownerInstruments: list("ownerInstruments"),
    recruitedInstruments: Object.fromEntries(
      INSTRUMENTS.map((instrument) => [instrument, text(recruitedInstrumentFieldName(instrument))]),
    ),
    requiredGenerations: list("requiredGenerations"),
    requiredGenders: list("requiredGenders"),
    deadline: text("deadline"),
    memo: text("memo"),
  });
}
