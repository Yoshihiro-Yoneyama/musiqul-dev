"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createRecruitment, RecruitmentSummary, type NewRecruitment } from "@/entities/recruitment";
import { HttpError, NetworkError, UnauthorizedError } from "@/shared/api";
import { routes } from "@/shared/config";
import { Alert } from "@/shared/ui/alert";
import { Button, ButtonLink } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Stack } from "@/shared/ui/stack";
import { clearDraft, useDraft } from "../model/draft";

/** 下書きの内容を表示し、確定すると募集を作成する */
export function RecruitmentConfirmation() {
  const draft = useDraft();
  const [created, setCreated] = useState(false);

  if (created) {
    return (
      <Stack gap="4">
        <Alert tone="success">募集を作成しました。</Alert>
        <Stack direction="row" gap="3">
          <ButtonLink href={routes.home} variant="secondary">
            ホームへ
          </ButtonLink>
          <ButtonLink href={routes.createRecruitment}>続けて募集を作成する</ButtonLink>
        </Stack>
      </Stack>
    );
  }
  if (draft === undefined) return null;
  if (draft === null) {
    return (
      <Stack gap="4">
        <Alert tone="error">確認する入力内容がありません。入力画面からやり直してください。</Alert>
        <div>
          <ButtonLink href={routes.createRecruitment}>入力画面へ</ButtonLink>
        </div>
      </Stack>
    );
  }
  return <Confirmation draft={draft} onCreated={() => setCreated(true)} />;
}

function Confirmation({ draft, onCreated }: { draft: NewRecruitment; onCreated: () => void }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleCreate() {
    setError(null);
    startTransition(async () => {
      try {
        await createRecruitment(draft);
        onCreated();
        clearDraft();
      } catch (cause) {
        if (cause instanceof UnauthorizedError) {
          router.replace(routes.login);
        } else if (cause instanceof HttpError && cause.status === 400) {
          setError("入力内容を受け付けられませんでした。入力画面に戻って内容を確認してください。");
        } else if (cause instanceof NetworkError) {
          setError("サーバーに接続できませんでした。時間をおいて再度お試しください。");
        } else {
          setError("募集の作成に失敗しました。時間をおいて再度お試しください。");
        }
      }
    });
  }

  return (
    <Stack gap="5">
      {error && <Alert tone="error">{error}</Alert>}
      <Card>
        <RecruitmentSummary recruitment={draft} />
      </Card>
      <Stack direction="row" justify="end" gap="3">
        <ButtonLink href={routes.createRecruitment} variant="secondary" aria-disabled={isPending}>
          修正する
        </ButtonLink>
        <Button onClick={handleCreate} disabled={isPending}>
          {isPending ? "作成中…" : "この内容で作成する"}
        </Button>
      </Stack>
    </Stack>
  );
}
