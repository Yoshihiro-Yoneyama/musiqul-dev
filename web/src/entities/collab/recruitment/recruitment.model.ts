import {z} from "zod";
import customErrorMap from "@/shared/lib/validate/customErrorMap";

export const recruitmentSchema = z.object({
  owner: z.string(),
  ownerInstruments: z.string().array(),
  songTitle: z.string({ errorMap: customErrorMap })
    .min(1)
    .max(500)
    .optional(),
  artist: z.string({ errorMap: customErrorMap })
    .min(1)
    .max(100)
    .optional(),
  name: z.string({ errorMap: customErrorMap })
    .min(1)
    .max(100),
  genres: z.string().array(),
  deadline: z.string(),
  requiredGenerations: z.string().array(),
  requiredGenders: z.string().array(),
  recruitedInstruments: z.map(z.string(), z.number()),
  memo: z.string({ errorMap: customErrorMap })
    .min(1)
    .max(2000)
    .optional(),
})

export type RecruitmentSchema = z.infer<typeof recruitmentSchema>