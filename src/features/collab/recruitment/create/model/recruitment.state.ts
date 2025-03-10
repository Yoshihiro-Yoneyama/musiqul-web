'use client'

import {RecruitmentSchema} from "@/entities/collab/recruitment/recruitment.model"
import {atom, useAtom} from "jotai"
import {useCallback} from "react"

/**
 * Define the initial values for recruitment
 */
const recruitmentAtom = atom<RecruitmentSchema>({
  owner: 'd39c9cdb-759c-479e-94c7-2ddc0a3044e8',
  ownerInstruments: [],
  name: '',
  genres: [],
  deadline: '',
  requiredGenerations: [],
  requiredGenders: [],
  recruitedInstruments: new Map(),
  memo: '',
});

/**
 * Define the hook to update the recruitment state
 */
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
    updatedRecruitment: recruitment,
    setUpdatedRecruitment: updateRecruitment,
  }
}