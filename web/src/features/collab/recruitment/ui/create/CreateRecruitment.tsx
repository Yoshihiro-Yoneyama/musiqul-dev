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
import {useCreateRecruitmentForm} from "../../model/create/useCreateRecruitment";
import React from "react";

type Props = {
  onPress?: () => void;
  isDisabled: boolean;
};

const CreateRecruitmentForm = (props: Props) => {
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
    handleAddInput,
    handleComboInputChange,
    memo,
    setMemo,
    handleSubmit,
    submitting,
  } = useCreateRecruitmentForm(props.onPress);
  
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
            onPress={handleSubmit}
            isDisabled={submitting || props.isDisabled}
          >
            内容を確認する→
          </Button>
          <br/>
        </div>
      </div>
    </div>
  );
};

export default CreateRecruitmentForm;
