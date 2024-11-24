import {z} from "zod";

export const recruitmentSchema = z.object({
  owner: z.string(),
  ownerInstruments: z.string().array(),
  songTitle: z.string().optional(),
  artist: z.string().optional(),
  name: z.string().min(1),
  genres: z.string().array(),
  deadline: z.string(),
  requiredGenerations: z.string().array(),
  requiredGenders: z.string().array(),
  recruitedInstruments: z.map(z.string(), z.number()),
  memo: z.string().optional(),
})

export type RecruitmentSchema = z.infer<typeof recruitmentSchema>