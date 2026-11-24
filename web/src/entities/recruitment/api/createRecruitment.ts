import { request } from "@/shared/api";
import type { NewRecruitment } from "../model/recruitment";

/** POST /recruitments のリクエスト（API の CreateRecruitCommandRequest） */
type CreateRecruitmentRequest = {
  name: string;
  songTitle: string;
  artist: string;
  genres: string[];
  ownerInstruments: string[];
  recruitedInstruments: Record<string, number>;
  requiredGenerations: string[];
  requiredGenders: string[];
  deadline: string;
  memo: string;
};

type CreateRecruitmentResponse = { id: string };

export async function createRecruitment(recruitment: NewRecruitment): Promise<{ id: string }> {
  const body: CreateRecruitmentRequest = {
    ...recruitment,
    recruitedInstruments: Object.fromEntries(
      Object.entries(recruitment.recruitedInstruments).filter(([, count]) => (count ?? 0) > 0),
    ) as Record<string, number>,
    deadline: recruitment.deadline.toISOString(),
  };
  const response = await request<CreateRecruitmentResponse>("/recruitments", { method: "POST", body });
  return { id: response.id };
}
