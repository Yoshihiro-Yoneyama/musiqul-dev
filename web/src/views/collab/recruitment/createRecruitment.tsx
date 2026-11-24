'use client'

import * as styles from './createRecruitment.css'
import React from 'react'
import CreateRecruitmentForm from '@/features/collab/recruitment/create/ui/createRecruitment'
import BorderButton from '@/shared/ui/atoms/button/BorderButton'
import Icon from '@/shared/ui/atoms/icon/Icon'

/**
 * コラボのメンバー募集画面
 */
export const CreateRecruitment = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>メンバーを募集する</h1>
        <BorderButton appearance="primary" type="button" onPress={() => {}}>
          <span className={styles.draftButtonInner}>
            下書きを開く
            <Icon type="pencil" color="#ffffff"/>
          </span>
        </BorderButton>
      </div>
      <CreateRecruitmentForm isDisabled={false}/>
    </div>
  )
}

export default CreateRecruitment
