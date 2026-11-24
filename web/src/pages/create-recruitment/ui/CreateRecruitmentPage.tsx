import type { Metadata } from "next";
import { RecruitmentForm } from "@/features/create-recruitment";
import { Heading } from "@/shared/ui/heading";
import { Stack } from "@/shared/ui/stack";

export const metadata: Metadata = { title: "募集を作成" };

export function CreateRecruitmentPage() {
  return (
    <Stack gap="5">
      <Heading level={1}>募集を作成</Heading>
      <RecruitmentForm />
    </Stack>
  );
}
