import type { Metadata } from "next";
import { RecruitmentConfirmation } from "@/features/create-recruitment";
import { Heading } from "@/shared/ui/heading";
import { Stack } from "@/shared/ui/stack";

export const metadata: Metadata = { title: "募集内容の確認" };

export function ConfirmRecruitmentPage() {
  return (
    <Stack gap="5">
      <Heading level={1}>募集内容の確認</Heading>
      <RecruitmentConfirmation />
    </Stack>
  );
}
