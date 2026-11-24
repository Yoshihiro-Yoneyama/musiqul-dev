import type { Metadata } from "next";
import { routes } from "@/shared/config";
import { ButtonLink } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Heading } from "@/shared/ui/heading";
import { Stack } from "@/shared/ui/stack";

export const metadata: Metadata = { title: "ホーム" };

export function HomePage() {
  return (
    <Stack gap="5">
      <Heading level={1}>ホーム</Heading>
      <Card>
        <Stack gap="3">
          <Heading level={2}>一緒に演奏する仲間を募集する</Heading>
          <p style={{ margin: 0 }}>演奏したい曲と、募集する楽器・人数を入力して募集を作成できます。</p>
          <div>
            <ButtonLink href={routes.createRecruitment}>募集を作成する</ButtonLink>
          </div>
        </Stack>
      </Card>
    </Stack>
  );
}
