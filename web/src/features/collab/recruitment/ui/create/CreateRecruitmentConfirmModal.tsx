'use client'

import React, {FC} from "react";
import ModalContent from "@/shared/ui/organisms/modal/ModalContent";
import Box from "@/shared/ui/atoms/box/Box";
import TextBox from "@/shared/ui/atoms/textbox/TextBox";
import {postRecruitment} from "@/entities/collab/recruitment/recruitment.api";
import {RecruitmentSchema} from "@/entities/collab/recruitment/recruitment.model";
import BorderButton from "@/shared/ui/atoms/button/BorderButton";
import Button from "@/shared/ui/atoms/button/Button";
import namedMemo from "@/shared/hooks/namedMemo";

type Props = {
  readonly confirmedRecruitment: RecruitmentSchema
  readonly onClose: () => void
}

// TODO このコンポーネントでModalを呼び出していないことが怪しい
const CreateRecruitmentConfirmModal: FC<Props> = ({
  confirmedRecruitment,
  onClose,
}) => {
  const handleSubmit = () => {
    postRecruitment(confirmedRecruitment).then(() => {})
  }
  
  return (
    <>
      <ModalContent
        title="募集内容の確認"
        closeButtonLabel="戻る"
        onChanged={handleSubmit}
        onClose={onClose}
      >
        <Box>
          <TextBox size="s">
            自分の楽器: {confirmedRecruitment.ownerInstruments.join(', ')}
          </TextBox>
          <TextBox size="s">
            曲名: {confirmedRecruitment.songTitle}
          </TextBox>
          <TextBox size="s">
            アーティスト: {confirmedRecruitment.artist}
          </TextBox>
          <TextBox size="s">
            募集名: {confirmedRecruitment.name}
          </TextBox>
          <TextBox size="s">
            ジャンル: {confirmedRecruitment.genres.join(', ')}
          </TextBox>
          <TextBox size="s">
            締め切り: {confirmedRecruitment.deadline}
          </TextBox>
          <TextBox size="s">
            世代: {confirmedRecruitment.requiredGenerations.join(', ')}
          </TextBox>
          <TextBox size="s">
            性別: {confirmedRecruitment.requiredGenders.join(', ')}
          </TextBox>
          <TextBox size="s">
            募集楽器: {Array.from(confirmedRecruitment.recruitedInstruments).map(([key, value]) => `${key}: ${value}`).join(', ')}
          </TextBox>
          <TextBox size="s">
            備考: {confirmedRecruitment.memo}
          </TextBox>
        </Box>
        <Box>
          <BorderButton
            appearance="primary"
            type="button"
          >
            戻る
          </BorderButton>
          <Button
            appearance="primary"
            type="button"
            onPress={handleSubmit}
          >
            登録する
          </Button>
        </Box>
      </ModalContent>
    </>
  )
}

export default namedMemo(
  CreateRecruitmentConfirmModal,
  'CreateRecruitmentConfirmModal'
)