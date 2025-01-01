'use client'

import React, {FC} from "react";
import ModalContent from "@/shared/ui/organisms/modal/ModalContent";
import Box from "@/shared/ui/atoms/box/Box";
import {RecruitmentSchema} from "@/entities/collab/recruitment/recruitment.model";
import BorderButton from "@/shared/ui/atoms/button/BorderButton";
import Button from "@/shared/ui/atoms/button/Button";
import namedMemo from "@/shared/hooks/namedMemo";
import Text from "@/shared/ui/atoms/text/Text";
import {postRecruitment} from "@/entities/collab/recruitment/recruitment.api";

type Props = {
  readonly onClose: () => void
  readonly updatedRecruitment: RecruitmentSchema
}

// TODO このコンポーネントでModalを呼び出していないことが怪しい
const CreateRecruitmentConfirmModal: FC<Props> = ({
  updatedRecruitment,
  onClose,
}) => {
  const handleSubmit = () => {
    // TODO postしたあとにモーダルを閉じて入力内容をクリアする処理を追加する
    postRecruitment(updatedRecruitment).then(() => {})
  }
  
  return (
    <>
      <ModalContent
        title="募集内容の確認"
        changeButtonLabel='登録する'
        closeButtonLabel='戻る'
        onChanged={handleSubmit}
        onClose={onClose}
      >
        <Box>
          <Text
            size="s"
          >
            自分の楽器: {updatedRecruitment.ownerInstruments.join(', ')}
          </Text>
          <Text
            size="s"
          >
            曲名: {updatedRecruitment.songTitle}
          </Text>
          <Text
            size="s"
          >
            アーティスト: {updatedRecruitment.artist}
          </Text>
          <Text
            size="s"
          >
            コラボ名: {updatedRecruitment.name}
          </Text>
          <Text
            size="s"
          >
            ジャンル: {updatedRecruitment.genres.join(', ')}
          </Text>
          <Text
            size="s"
          >
            締め切り: {updatedRecruitment.deadline}
          </Text>
          <Text
            size="s"
          >
            世代: {updatedRecruitment.requiredGenerations.join(', ')}
          </Text>
          <Text
            size="s"
          >
            性別: {updatedRecruitment.requiredGenders.join(', ')}
          </Text>
          <Text
            size="s"
          >
            応募楽器: {Array.from(updatedRecruitment.recruitedInstruments).map(([key, value]) => `${key}: ${value}`).join(', ')}
          </Text>
          <Text
            size="s"
          >
            メモ: {updatedRecruitment.memo}
          </Text>
        </Box>
        <Box>
          {/*<BorderButton*/}
          {/*  appearance="primary"*/}
          {/*  type="button"*/}
          {/*>*/}
          {/*  戻る*/}
          {/*</BorderButton>*/}
          {/*<Button*/}
          {/*  appearance="primary"*/}
          {/*  type="button"*/}
          {/*  onPress={handleSubmit}*/}
          {/*>*/}
          {/*  登録する*/}
          {/*</Button>*/}
        </Box>
      </ModalContent>
    </>
  )
}

export default namedMemo(
  CreateRecruitmentConfirmModal,
  'CreateRecruitmentConfirmModal'
)