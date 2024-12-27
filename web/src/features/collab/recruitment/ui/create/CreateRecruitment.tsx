'use client';

import * as styles from "./createRecruitment.css";
import InputCalendar from "@/shared/ui/molecules/input-calendar/InputCalendar";
import Checkbox from "@/shared/ui/atoms/checkbox/Checkbox";
import BorderButton from "@/shared/ui/atoms/button/BorderButton";
import Button from "@/shared/ui/atoms/button/Button";
import InputForm from "@/shared/ui/molecules/input-form/InputForm";
import ComboInput from "@/features/collab/recruitment/ui/create/ComboInput";
import TextArea from "@/shared/ui/molecules/input-textarea/TextArea";
import {
  genreOptions,
  recruitedInstrumentOptions,
  requiredGenderOptions,
  requiredGenerationOptions,
  requiredNumberOfInstrumentOptions,
} from "@/features/collab/recruitment/model/options";
import {useCreateRecruitmentForm} from "../../model/create/UseCreateRecruitment";
import React, {useCallback} from "react";
import useModal from "@/shared/hooks/useModal";
import CreateRecruitmentConfirmModal from "@/features/collab/recruitment/ui/create/CreateRecruitmentConfirmModal";
import Modal from "@/shared/ui/organisms/modal/Modal";
import Box from "@/shared/ui/atoms/box/Box";
import TextBox from "@/shared/ui/atoms/textbox/TextBox";
import ModalContent from "@/shared/ui/organisms/modal/ModalContent";
import {RecruitmentSchema} from "@/entities/collab/recruitment/recruitment.model";
import {postRecruitment} from "@/entities/collab/recruitment/recruitment.api";

type Props = {
  readonly onPress?: () => void;
  readonly isDisabled: boolean;
  readonly confirmedRecruitment: RecruitmentSchema;
};

const CreateRecruitmentForm = (props: Props) => {
  const { isOpen, modalOptions, openModal, closeModal } = useModal();
  const handleSubmit = () => {
    postRecruitment(props.confirmedRecruitment).then(() => {})
  }
  const {
    ownerInstruments,
    setOwnerInstruments,
    songTitle,
    setSongTitle,
    artist,
    setArtist,
    name,
    setName,
    genres,
    setGenres,
    deadline,
    setDeadline,
    requiredGenerations,
    setRequiredGenerations,
    requiredGenders,
    setRequiredGenders,
    requiredInstrumentInputs,
    setMemo,
    memo,
    handleAddInput,
    handleComboInputChange,
    submitting,
  } = useCreateRecruitmentForm(() => {
    openModal({
      children: (
        <CreateRecruitmentConfirmModal
          confirmedRecruitment={{
            owner: "",
            deadline,
            ownerInstruments,
            genres,
            requiredGenerations,
            requiredGenders,
            recruitedInstruments: new Map(
              requiredInstrumentInputs.map((input) => [
                input.selectedString,
                input.selectedNumber,
              ])
            ),
            memo,
            songTitle,
            artist,
            name,
          }}
          onClose={closeModal} // モーダル閉じる処理を渡す
        />
      ),
      dialogAriaLabel: "募集内容の確認",
    });
  });
  
  return (
    <div className={styles.itemsSetVertical}>
      <div className={styles.itemsSetHorizontal}>
        <Checkbox
          props={{defaultSelected: false}}
          options={recruitedInstrumentOptions}
          selectedValues={ownerInstruments}
          onChange={setOwnerInstruments}
        />
      </div>
      <div className={styles.itemsSetHorizontal}>
        <InputForm
          title="曲名"
          displayedRequired={false}
          textBoxProps={{
            isDisabled: false,
            onChange: setSongTitle,
          }}
        />
        <InputForm
          title="アーティスト名"
          displayedRequired={false}
          textBoxProps={{
            isDisabled: false,
            onChange: setArtist,
          }}
        />
      </div>
      
      
      <div className={styles.itemsSetVertical}>
        {/*選択解除後も文字を白で表示したい*/}
        {/*ドロップダウンリストの下矢印を白で表示したい*/}
        <div className={styles.itemsSetHorizontal}>
          {/* ジャンルは一旦チェックボックスで作る */}
          <Checkbox
            props={{
              defaultSelected: false,
            }}
            options={genreOptions}
            selectedValues={genres}
            onChange={setGenres}
          />
          <InputForm
            title="コラボ名"
            displayedRequired={false}
            textBoxProps={
              {
                isDisabled: false,
                onChange: setName
              }
            }
          />
        </div>
        <div className={styles.itemsSetHorizontal}>
          <InputCalendar
            title={"募集締切日"}
            displayedRequired={true}
            datePickerProps={
              {
                isDisabled: false,
                onChange: setDeadline,
              }
            }
          />
        </div>
        <p className={styles.headline2}>応募するメンバー</p>
        <div className={styles.itemsSetHorizontal}>
          <Checkbox
            props={{
              defaultSelected: false,
            }}
            options={requiredGenerationOptions}
            selectedValues={requiredGenerations}
            onChange={setRequiredGenerations}
          />
        </div>
        <div className={styles.itemsSetHorizontal}>
          <Checkbox
            props={{
              defaultSelected: false,
            }}
            options={requiredGenderOptions}
            selectedValues={requiredGenders}
            onChange={setRequiredGenders}
          />
        </div>
        <div className={styles.itemsSetHorizontal}>
          {requiredInstrumentInputs.map((input) => (
            <ComboInput
              key={input.id} // 一意のIDを設定
              title={"楽器"}
              defaultStringOption={''}
              stringOptions={recruitedInstrumentOptions}
              numberOptions={requiredNumberOfInstrumentOptions}
              onChange={(stringValue, numberValue) =>
                handleComboInputChange(input.id, stringValue, numberValue)
              }
              selectedString={input.selectedString}
              selectedNumber={input.selectedNumber}
            />
          ))}
          <button onClick={handleAddInput}>
            ＋
          </button>
        </div>
        <TextArea
          label={"メモ"}
          type={"text"}
          valueType={"string"}
          placeholder={"メモを入力してください"}
          isDisabled={false}
          onChange={setMemo}
        />
        <div className={styles.itemsSetHorizontal}>
          <BorderButton
            appearance="primary"
            type="button"
            onPress={() => {
            }}
          >
            下書きに保存する
          </BorderButton>
          <Button
            appearance="primary"
            type="button"
            isDisabled={submitting || props.isDisabled}
            onPress={() => {
              openModal({
                children: "モーダルの内容",
                dialogAriaLabel: "内容を確認する",
              });
            }}
          >
            内容を確認する→
          </Button>
          <br/>
        </div>
      </div>
      {/* モーダル */}
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onOpenChange={closeModal}
          isDismissable={true}
          dialogAriaLabel={modalOptions.dialogAriaLabel}
        >
          <ModalContent
            title="募集内容の確認"
            closeButtonLabel="戻る"
            onChanged={handleSubmit}
          >
            <Box>
              test
              {/*<TextBox size="s">*/}
              {/*  自分の楽器: {props.confirmedRecruitment.ownerInstruments.join(', ')}*/}
              {/*</TextBox>*/}
              {/*<TextBox size="s">*/}
              {/*  曲名: {props.confirmedRecruitment.songTitle}*/}
              {/*</TextBox>*/}
              {/*<TextBox size="s">*/}
              {/*  アーティスト: {props.confirmedRecruitment.artist}*/}
              {/*</TextBox>*/}
              {/*<TextBox size="s">*/}
              {/*  募集名: {props.confirmedRecruitment.name}*/}
              {/*</TextBox>*/}
              {/*<TextBox size="s">*/}
              {/*  ジャンル: {props.confirmedRecruitment.genres.join(', ')}*/}
              {/*</TextBox>*/}
              {/*<TextBox size="s">*/}
              {/*  締め切り: {props.confirmedRecruitment.deadline}*/}
              {/*</TextBox>*/}
              {/*<TextBox size="s">*/}
              {/*  世代: {props.confirmedRecruitment.requiredGenerations.join(', ')}*/}
              {/*</TextBox>*/}
              {/*<TextBox size="s">*/}
              {/*  性別: {props.confirmedRecruitment.requiredGenders.join(', ')}*/}
              {/*</TextBox>*/}
              {/*<TextBox size="s">*/}
              {/*  募集楽器: {Array.from(props.confirmedRecruitment.recruitedInstruments).map(([key, value]) => `${key}: ${value}`).join(', ')}*/}
              {/*</TextBox>*/}
              {/*<TextBox size="s">*/}
              {/*  備考: {props.confirmedRecruitment.memo}*/}
              {/*</TextBox>*/}
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
        </Modal>
      )}
    </div>
  );
};

export default CreateRecruitmentForm;

