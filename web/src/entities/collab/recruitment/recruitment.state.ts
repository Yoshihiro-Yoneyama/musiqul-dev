import {RecruitmentSchema} from "@/entities/collab/recruitment/recruitment.model";
import {atom} from "jotai/vanilla/atom";
import {useCallback} from "react";
import {useAtom} from "jotai/react/useAtom";

export const useRecruitment = () => {
  
  // Define the initial values for recruitment
  const recruitmentAtom = atom<RecruitmentSchema>({
    owner: '',
    name: '',
    genre: [],
    deadline: '',
    requiredGenerations: [],
    requiredGender: '',
  });
  
  const [recruitment, setRecruitment] = useAtom(recruitmentAtom)
  const updateRecruitment = useCallback(
    (updatedRecruitment: RecruitmentSchema) => {
      setRecruitment(() => {
        return updatedRecruitment
      })
    },
    [setRecruitment]
  )
  
  return {
    recruitment: recruitment,
    updateRecruitment,
  }
}