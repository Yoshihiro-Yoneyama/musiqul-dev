'use client'

import * as styles from "./createRecruitment.css"
import React from "react"
import InputForm from "@/shared/ui/molecules/input-form/InputForm"
import MultiSelector from "@/shared/ui/molecules/multi-selector/MultiSelector"
import InputCalendar from "@/shared/ui/molecules/input-calendar/InputCalendar"
import TextArea from "@/shared/ui/molecules/input-textarea/TextArea"
import Checkbox from "@/shared/ui/atoms/checkbox/Checkbox"
import Button from "@/shared/ui/atoms/button/Button"
import BorderButton from "@/shared/ui/atoms/button/BorderButton"
import Icon from "@/shared/ui/atoms/icon/Icon"
import Required from "@/shared/ui/atoms/required/Required"
import ErrorMessage from "@/shared/ui/atoms/error-message/ErrorMessage"
import Modal from "@/shared/ui/organisms/modal/Modal"
import ComboInput from "@/features/collab/recruitment/create/ui/comboInput"
import CreateRecruitmentConfirmModal from "@/features/collab/recruitment/create/ui/createRecruitmentConfirmModal"
import {
  genreOptions,
  recruitedInstrumentOptions,
  requiredGenderOptions,
  requiredGenerationOptions,
  requiredNumberOfInstrumentOptions,
} from "@/features/collab/recruitment/model/options"
import {useCreateRecruitmentForm} from "@/features/collab/recruitment/create/model/useCreateRecruitment"
import {useRecruitment} from "@/features/collab/recruitment/create/model/recruitment.state"
import {recruitmentSchema, RecruitmentSchema} from "@/entities/collab/recruitment/recruitment.model"
import {useValidation} from "@/shared/lib/validate/useValidate"
import useModal from "@/shared/hooks/useModal"

type Props = {
  readonly onPress?: () => void
  readonly isDisabled: boolean
  readonly confirmedRecruitment?: RecruitmentSchema
}

const CreateRecruitmentForm = (props: Props) => {
  const {updatedRecruitment} = useRecruitment()
  const {isOpen, modalOptions, openModal, closeModal} = useModal()
  const {errorMessages, validate} = useValidation<typeof recruitmentSchema>()
  const {
    ownerInstruments,
    setOwnerInstruments,
    setSongTitle,
    setArtist,
    setName,
    genres,
    setGenres,
    setDeadline,
    requiredGenerations,
    setRequiredGenerations,
    requiredGenders,
    setRequiredGenders,
    requiredInstrumentInputs,
    setMemo,
    handleAddInput,
    handleComboInputChange,
    submitting,
  } = useCreateRecruitmentForm()

  const handleConfirm = () => {
    const hasError = validate(updatedRecruitment, recruitmentSchema)
    if (hasError) return
    openModal({
      children: "内容を確認する",
      dialogAriaLabel: "内容を確認する",
    })
  }

  return (
    <div className={styles.form}>
      {/* あなたの担当楽器（プロフィール由来の楽器を初期チェックする想定。TODO: プロフィール連携） */}
      <section className={styles.section}>
        <p className={styles.sectionTitle}>あなたの担当楽器</p>
        <div className={styles.checkRow}>
          <span className={styles.rowLabel}>楽器</span>
          <Required displayed={true}/>
          <div className={styles.checks}>
            <Checkbox
              props={{defaultSelected: false}}
              options={recruitedInstrumentOptions}
              selectedValues={ownerInstruments}
              onChange={setOwnerInstruments}
            />
          </div>
        </div>
        <div className={styles.errorSlot}>
          {errorMessages.ownerInstruments && (
            <ErrorMessage message={errorMessages.ownerInstruments}/>
          )}
        </div>
      </section>

      {/* 曲の情報 */}
      <section className={styles.section}>
        <p className={styles.sectionTitle}>曲の情報</p>
        <p className={styles.helperText}>
          曲名、アーティスト名、ジャンル名のうち、最低１つを入力してください。
        </p>
        <div className={styles.row}>
          <InputForm
            label="曲名"
            displayedRequired={false}
            placeholder="入力してください"
            textBoxProps={{isDisabled: false, onChange: setSongTitle}}
          />
          <InputForm
            label="アーティスト名"
            displayedRequired={false}
            placeholder="入力してください"
            textBoxProps={{isDisabled: false, onChange: setArtist}}
          />
        </div>
        <MultiSelector
          title="ジャンル（複数選択可）"
          displayedRequired={false}
          options={genreOptions}
          selectedValues={genres}
          placeholder="選択してください"
          onChange={setGenres}
        />
      </section>

      {/* コラボの情報 */}
      <section className={styles.section}>
        <p className={styles.sectionTitle}>コラボの情報</p>
        <div className={styles.row}>
          <div className={styles.field}>
            <InputForm
              label="コラボ名"
              displayedRequired={true}
              placeholder="入力してください"
              textBoxProps={{isDisabled: false, onChange: setName}}
            />
            <div className={styles.errorSlot}>
              {errorMessages.name && <ErrorMessage message={errorMessages.name}/>}
            </div>
          </div>
          <div className={styles.field}>
            <InputCalendar
              title="募集締切日"
              displayedRequired={true}
              datePickerProps={{isDisabled: false, onChange: setDeadline}}
            />
            <div className={styles.errorSlot}>
              {errorMessages.deadline && <ErrorMessage message={errorMessages.deadline}/>}
            </div>
          </div>
        </div>
      </section>

      {/* 募集するメンバー */}
      <section className={styles.section}>
        <p className={styles.sectionTitle}>募集するメンバー</p>
        <div className={styles.checkRow}>
          <span className={styles.rowLabel}>年齢</span>
          <div className={styles.checks}>
            <Checkbox
              props={{defaultSelected: false}}
              options={requiredGenerationOptions}
              selectedValues={requiredGenerations}
              onChange={setRequiredGenerations}
            />
          </div>
        </div>
        <div className={styles.checkRow}>
          <span className={styles.rowLabel}>性別</span>
          <div className={styles.checks}>
            <Checkbox
              props={{defaultSelected: false}}
              options={requiredGenderOptions}
              selectedValues={requiredGenders}
              onChange={setRequiredGenders}
            />
          </div>
        </div>
        {requiredInstrumentInputs.map((input, index) => (
          <div className={styles.instrumentRow} key={input.id}>
            <ComboInput
              title={index === 0 ? "楽器" : ""}
              displayedRequired={index === 0}
              defaultStringOption={'選択してください'}
              stringOptions={recruitedInstrumentOptions}
              numberOptions={requiredNumberOfInstrumentOptions}
              onChange={(stringValue, numberValue) =>
                handleComboInputChange(input.id, stringValue, numberValue)
              }
              selectedString={input.selectedString}
              selectedNumber={input.selectedNumber}
            />
            <span>人</span>
          </div>
        ))}
        <button className={styles.addButton} onClick={handleAddInput} type="button">
          <Icon type="circlePlus" color="#ffffff"/>
          楽器を追加する
        </button>
      </section>

      {/* 自由入力欄 */}
      <section className={styles.section}>
        <p className={styles.sectionTitle}>自由入力欄</p>
        <TextArea
          type="text"
          valueType="string"
          placeholder="入力してください"
          isDisabled={false}
          onChange={setMemo}
        />
      </section>

      <div className={styles.bottomActions}>
        <BorderButton appearance="primary" type="button" onPress={() => {}}>
          下書きに保存する
        </BorderButton>
        <Button
          appearance="primary"
          type="button"
          isDisabled={submitting || props.isDisabled}
          onPress={handleConfirm}
        >
          内容を確認する→
        </Button>
      </div>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onOpenChange={closeModal}
          isDismissable={true}
          dialogAriaLabel={modalOptions.dialogAriaLabel}
        >
          <CreateRecruitmentConfirmModal
            onClose={closeModal}
            updatedRecruitment={updatedRecruitment}
            resetRecruitment={() => {}}
          />
        </Modal>
      )}
    </div>
  )
}

export default CreateRecruitmentForm
