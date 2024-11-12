import {atom} from "jotai";
import {RecruitmentSchema} from "@/entities/collab/recruitment/recruitment.model";
import {useAtom} from "jotai/react/useAtom";
import {useCallback} from "react";

const recruitmentAtom = atom<RecruitmentSchema>()

export const useRecruitment = () => {
  const [recruitment, setRecruitment] = useAtom<RecruitmentSchema|undefined>(recruitmentAtom)
  
  const updateRecruitment = useCallback(
    (updatedRecruitment: RecruitmentSchema) => {
      setRecruitment(updatedRecruitment)
    },
    [setRecruitment]
  )
  return {recruitment, setRecruitment, updateRecruitment}
}