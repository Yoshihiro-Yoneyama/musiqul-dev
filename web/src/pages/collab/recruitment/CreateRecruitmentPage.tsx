'use client'

import * as styles from './createRecruitmentPage.css'
import React from 'react'
import CreateRecruitmentForm from '@/features/collab/recruitment/ui/create/CreateRecruitment'

/**
 * コラボの募集を新規登録するコンポーネント
 */
export const CreateRecruitmentPage = () => {
  return (
    <div>
      <p className={styles.headline1}>メンバーを募集する</p>
      <p className={styles.headline2}>募集するコラボの基本情報</p>
      <CreateRecruitmentForm isDisabled={false}/>
    </div>
  )
}

export default CreateRecruitmentPage