"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import {
  GENDER_REQUIREMENTS,
  GENERATIONS,
  INSTRUMENTS,
  MUSIC_GENRES,
  RECRUITMENT_LIMITS,
  genderRequirementLabels,
  generationLabels,
  instrumentLabels,
  musicGenreLabels,
  type NewRecruitment,
} from "@/entities/recruitment";
import { routes } from "@/shared/config";
import { toDateTimeLocalValue, toFieldErrors, type FieldErrors } from "@/shared/lib";
import { Alert } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { CheckboxGroup } from "@/shared/ui/checkbox-group";
import { Field } from "@/shared/ui/field";
import { Fieldset } from "@/shared/ui/fieldset";
import { Heading } from "@/shared/ui/heading";
import { Stack } from "@/shared/ui/stack";
import { TextArea } from "@/shared/ui/text-area";
import { TextInput } from "@/shared/ui/text-input";
import { saveDraft, useDraft } from "../model/draft";
import { readRecruitmentForm, recruitedInstrumentFieldName, type RecruitmentFormFields } from "../model/schema";
import * as styles from "./RecruitmentForm.css";

const options = <V extends string>(values: readonly V[], labels: Record<V, string>) =>
  values.map((value) => ({ value, label: labels[value] }));

/** 募集の入力フォーム。検証に通ったら下書きとして保存し、確認画面へ進む */
export function RecruitmentForm() {
  const draft = useDraft();
  if (draft === undefined) return null; // 下書きを読み込むまでは描画しない（入力欄の初期値がずれるため）
  return <RecruitmentFormContent draft={draft} />;
}

function RecruitmentFormContent({ draft }: { draft: NewRecruitment | null }) {
  const router = useRouter();
  const [errors, setErrors] = useState<FieldErrors<RecruitmentFormFields>>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = readRecruitmentForm(new FormData(event.currentTarget));
    if (!result.success) {
      setErrors(toFieldErrors(result.error));
      return;
    }
    setErrors({});
    saveDraft(result.data);
    router.push(routes.confirmRecruitment);
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="募集の作成">
      <Stack gap="5">
        {hasErrors && <Alert tone="error">入力内容に誤りがあります。各項目のメッセージを確認してください。</Alert>}

        <Card className={styles.section} aria-labelledby="recruitment-basic">
          <Heading level={2} id="recruitment-basic">
            曲の情報
          </Heading>
          <Field label="募集名" required hint={`${RECRUITMENT_LIMITS.nameMaxLength}文字以内`} error={errors.name}>
            {(control) => <TextInput {...control} name="name" defaultValue={draft?.name} />}
          </Field>
          <Field label="曲名" error={errors.songTitle}>
            {(control) => <TextInput {...control} name="songTitle" defaultValue={draft?.songTitle} />}
          </Field>
          <Field label="アーティスト" error={errors.artist}>
            {(control) => <TextInput {...control} name="artist" defaultValue={draft?.artist} />}
          </Field>
          <CheckboxGroup
            name="genres"
            legend="ジャンル"
            options={options(MUSIC_GENRES, musicGenreLabels)}
            defaultValues={draft?.genres}
            error={errors.genres}
          />
        </Card>

        <Card className={styles.section} aria-labelledby="recruitment-members">
          <Heading level={2} id="recruitment-members">
            メンバー
          </Heading>
          <CheckboxGroup
            name="ownerInstruments"
            legend="あなたの担当楽器"
            options={options(INSTRUMENTS, instrumentLabels)}
            defaultValues={draft?.ownerInstruments}
            error={errors.ownerInstruments}
          />
          <Fieldset
            legend="募集する楽器と人数"
            required
            hint="募集しない楽器は 0 または空欄のままにしてください"
            error={errors.recruitedInstruments}
          >
            <div className={styles.instrumentCounts}>
              {INSTRUMENTS.map((instrument) => (
                <Field key={instrument} label={instrumentLabels[instrument]}>
                  {(control) => (
                    <TextInput
                      {...control}
                      name={recruitedInstrumentFieldName(instrument)}
                      type="number"
                      inputMode="numeric"
                      min={0}
                      max={RECRUITMENT_LIMITS.instrumentCountMax}
                      defaultValue={draft?.recruitedInstruments[instrument]}
                    />
                  )}
                </Field>
              ))}
            </div>
          </Fieldset>
          <CheckboxGroup
            name="requiredGenerations"
            legend="募集する年代"
            hint="指定しない場合は空欄のままにしてください"
            options={options(GENERATIONS, generationLabels)}
            defaultValues={draft?.requiredGenerations}
            error={errors.requiredGenerations}
          />
          <CheckboxGroup
            name="requiredGenders"
            legend="募集する性別"
            hint="指定しない場合は空欄のままにしてください"
            options={options(GENDER_REQUIREMENTS, genderRequirementLabels)}
            defaultValues={draft?.requiredGenders}
            error={errors.requiredGenders}
          />
        </Card>

        <Card className={styles.section} aria-labelledby="recruitment-other">
          <Heading level={2} id="recruitment-other">
            締め切りとメモ
          </Heading>
          <Field label="締め切り" required error={errors.deadline}>
            {(control) => (
              <TextInput
                {...control}
                name="deadline"
                type="datetime-local"
                defaultValue={draft ? toDateTimeLocalValue(draft.deadline) : undefined}
              />
            )}
          </Field>
          <Field label="メモ" hint={`${RECRUITMENT_LIMITS.memoMaxLength}文字以内`} error={errors.memo}>
            {(control) => <TextArea {...control} name="memo" defaultValue={draft?.memo} />}
          </Field>
        </Card>

        <Stack direction="row" justify="end">
          <Button type="submit">確認画面へ</Button>
        </Stack>
      </Stack>
    </form>
  );
}
