import {RecruitmentSchema} from "@/entities/collab/recruitment/recruitment.model";
import {atom} from "jotai/vanilla/atom";
import {useCallback} from "react";
import {useAtom} from "jotai/react/useAtom";

export const recruitmentAtom = atom<RecruitmentSchema>()

export const useRecruitment = () => {
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
    recruitment,
    updateRecruitment,
  }
}