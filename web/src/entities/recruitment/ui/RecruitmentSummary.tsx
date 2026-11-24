import { Fragment } from "react";
import { formatDateTime } from "@/shared/lib";
import {
  genderRequirementLabels,
  generationLabels,
  INSTRUMENTS,
  instrumentLabels,
  musicGenreLabels,
  type NewRecruitment,
} from "../model/recruitment";
import * as styles from "./RecruitmentSummary.css";

const NONE = "指定なし";

function joinLabels<K extends string>(values: readonly K[], labels: Record<K, string>): string {
  return values.length === 0 ? NONE : values.map((value) => labels[value]).join("、");
}

/** 募集の内容を一覧で表示する */
export function RecruitmentSummary({ recruitment }: { recruitment: NewRecruitment }) {
  const recruited = INSTRUMENTS.filter((instrument) => (recruitment.recruitedInstruments[instrument] ?? 0) > 0)
    .map((instrument) => `${instrumentLabels[instrument]} ${recruitment.recruitedInstruments[instrument]}人`)
    .join("、");

  const rows: [string, string][] = [
    ["募集名", recruitment.name],
    ["曲名", recruitment.songTitle || NONE],
    ["アーティスト", recruitment.artist || NONE],
    ["ジャンル", joinLabels(recruitment.genres, musicGenreLabels)],
    ["あなたの担当楽器", joinLabels(recruitment.ownerInstruments, instrumentLabels)],
    ["募集する楽器と人数", recruited],
    ["年代", joinLabels(recruitment.requiredGenerations, generationLabels)],
    ["性別", joinLabels(recruitment.requiredGenders, genderRequirementLabels)],
    ["締め切り", formatDateTime(recruitment.deadline)],
    ["メモ", recruitment.memo || NONE],
  ];

  return (
    <dl className={styles.list}>
      {rows.map(([term, description]) => (
        <Fragment key={term}>
          <dt className={styles.term}>{term}</dt>
          <dd className={styles.description}>{description}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
