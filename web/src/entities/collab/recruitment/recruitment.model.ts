import {array, date, InferType, object, string} from "yup";

export const recruitmentSchema = object({
  owner: string().required(),
  // ownerInstruments: string[],
  songTitle: string().optional(),
  artist: string().optional(),
  name: string().required(),
  genre: array().optional(),
  deadline: string(),
  requiredGenerations: array().optional(),
  requiredGender: string(),
  // map形式
  // recruitedInstruments: string[],
})

export type RecruitmentSchema = InferType<typeof recruitmentSchema>