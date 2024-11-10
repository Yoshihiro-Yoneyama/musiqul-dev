import {array, date, object, string} from "yup";

export const recruitmentSchema = object({
  owner: string().required(),
  // ownerInstruments: string[],
  songTitle: string().optional(),
  artist: string().optional(),
  name: string().required(),
  genre: array().optional(),
  deadline: date(),
  requiredGenerations: array().optional(),
  requiredGender: string(),
  // map形式
  // recruitedInstruments: string[],
})