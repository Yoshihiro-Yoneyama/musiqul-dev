import {z} from "zod";
import customErrorMap from "@/shared/lib/validate/customErrorMap";
import {validationErrorMessages as messages} from "@/entities/collab/recruitment/errorMessages";

export const recruitmentSchema = z.object({
  owner: z.string(),
  ownerInstruments: z.string().array(),
  songTitle: z.string({ errorMap: customErrorMap })
    .max(500, messages.songTitle.maxLength)
    .optional(),
  artist: z.string({ errorMap: customErrorMap })
    .max(100, messages.artist.maxLength)
    .optional(),
  name: z.string()
    .min(1, messages.name.minLength)
    .max(100, messages.name.maxLength),
  genres: z.string().array(),
  deadline: z.string(),
  requiredGenerations: z.string().array(),
  requiredGenders: z.string().array(),
  recruitedInstruments: z.map(z.string(), z.number()),
  memo: z.string({ errorMap: customErrorMap })
    .max(2000, messages.memo.maxLength)
    .optional(),
})

export type RecruitmentSchema = z.infer<typeof recruitmentSchema>