import {RecruitmentSchema} from "@/entities/collab/recruitment/recruitment.model";
import {postRecruitment} from "@/entities/collab/recruitment/recruitment.api";

/**
 * Creating a New Recruitment Entry
 *
 * @param recruitment RecruitmentSchema Component
 */
export const createRecruitment = async (
  recruitment: RecruitmentSchema
) => {
  const newRecruit: RecruitmentSchema = {
    owner: recruitment.owner,
    // ownerInstruments: string[],
    songTitle: recruitment.songTitle,
    artist: recruitment.artist,
    name: recruitment.name,
    genre: recruitment.genre,
    deadline: recruitment.deadline,
    requiredGenerations: recruitment.requiredGenerations,
    requiredGender: recruitment.requiredGender,
    // TODO Define below type of map
    // recruitedInstruments: string[],
  }
  
  const result = await (postRecruitment(newRecruit))

  // TODO　Document the error handling in the implementation
  
  return {
    ...recruitment,
    // errors: undefined,
  }
}