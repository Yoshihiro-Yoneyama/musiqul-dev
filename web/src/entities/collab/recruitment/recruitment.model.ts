import {z} from "zod";

export const recruitmentSchema = z.object({
  owner: z.string(),
  // ownerInstruments: string[],
  songTitle: z.string().optional(),
  artist: z.string().optional(),
  name: z.string().min(1),
  genre: z.string().array(),
  deadline: z.string(),
  requiredGenerations: z.string().array().optional(),
  requiredGender: z.string(),
  // map形式
  // recruitedInstruments: string[],
})

export type RecruitmentSchema = z.infer<typeof recruitmentSchema>