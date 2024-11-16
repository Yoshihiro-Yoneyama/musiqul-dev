'use client'

import {RecruitmentSchema} from "@/entities/collab/recruitment/recruitment.model"
import {atom, useAtom } from "jotai"
import {useCallback} from "react"

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