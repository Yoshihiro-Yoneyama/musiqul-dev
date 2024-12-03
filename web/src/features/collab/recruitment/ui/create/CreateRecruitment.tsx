'use client'

import * as styles from "./createRecruitment.css";
import InputCalendar from "@/shared/ui/molecules/input-calendar/InputCalendar";
import Checkbox from "@/shared/ui/atoms/checkbox/Checkbox";
import BorderButton from "@/shared/ui/atoms/button/BorderButton";
import Button from "@/shared/ui/atoms/button/Button";
import React, {useCallback, useState} from "react";
import {useRecruitment} from "@/entities/collab/recruitment/recruitment.state";
import {createRecruitment} from "@/features/collab/recruitment/model/createRecruitment";
import InputForm from "@/shared/ui/molecules/input-form/InputForm";
import {
  genreOptions,
  recruitedInstrumentOptions,
  requiredGenderOptions,
  requiredGenerationOptions,
  requiredNumberOfInstrumentOptions
} from "@/features/collab/recruitment/model/options";
import ComboInput from "@/features/collab/recruitment/ui/create/ComboInput";
import TextArea from "@/shared/ui/molecules/input-textarea/TextArea";

type Props = {
  onPress?: () => void
  isDisabled: boolean
}

const CreateRecruitmentForm = (props: Props) => {
  const [songTitle, setSongTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [name, setName] = useState('')
  const [genres, setGenres] = useState<string[]>([])
  const [deadline, setDeadline] = useState('')
  const [requiredGenerations, setRequiredGenerations] = useState<string[]>([])
  const [requiredGenders, setRequiredGenders] = useState<string[]>([])
  const [recruitedInstruments, setRecruitedInstruments] = useState<Map<string, number>>(new Map());
  const [memo, setMemo] = useState('')
  
  const {updatedRecruitment, setUpdatedRecruitment} = useRecruitment()
  
  const handleSongTitleChange = (value: string) => {
    setSongTitle(value)
    setUpdatedRecruitment({
      ...updatedRecruitment,
      songTitle: value || '',
    })
  }
  const handleArtistChange = (value: string) => {
    setArtist(value)
    setUpdatedRecruitment({
      ...updatedRecruitment,
      artist: value || '',
    })
  }
  const handleNameChange = (value: string) => {
    setName(value)
    setUpdatedRecruitment({
      ...updatedRecruitment,
      name: value || '',
    })
  }
  const handleGenres = (values: string[]) => {
    setGenres(values)
    setUpdatedRecruitment({
      ...updatedRecruitment,
      genres: values || [],
    })
  }
  const handleDeadline = (value: string) => {
    setDeadline(value)
    setUpdatedRecruitment({
      ...updatedRecruitment,
      deadline: value || '',
    })
  }
  const handleRequiredGenerations = (values: string[]) => {
    setRequiredGenerations(values)
    setUpdatedRecruitment({
      ...updatedRecruitment,
      requiredGenerations: values || [],
    })
  }
  const handleRequiredGenders = (values: string[]) => {
    setRequiredGenders(values)
    setUpdatedRecruitment({
      ...updatedRecruitment,
      requiredGenders: values || [],
    })
  }
  const handleComboInputChange = (
    id: number,
    stringValue: string,
    numberValue: number
  ) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === id
          ? { ...input, selectedString: stringValue, selectedNumber: numberValue }
          : input
      )
    );
    
    // 全体の recruitedInstruments 状態も更新
    setRecruitedInstruments((prevMap) => {
      const updatedMap = new Map(prevMap);
      
      if (numberValue === 0) {
        updatedMap.delete(stringValue); // 数量が0なら削除
      } else {
        updatedMap.set(stringValue, numberValue); // 数量を更新
      }
      
      setUpdatedRecruitment({
        ...updatedRecruitment,
        recruitedInstruments: updatedMap,
      });
      
      return updatedMap;
    });
  };
  
  
  const [inputs, setInputs] = useState<
    { id: number; selectedString: string; selectedNumber: number }[]
  >([{id: 1, selectedString: "", selectedNumber: 0}]);
  
  
  const handleAddInput = () => {
    const newId = inputs.length + 1;
    setInputs([
      ...inputs,
      {id: newId, selectedString: "", selectedNumber: 0},
    ]);
  };
  
  const handleMemoChange = (value: string) => {
    setMemo(value)
    setUpdatedRecruitment({
      ...updatedRecruitment,
      memo: value || ''
    })
  }
  
  const [submitting, setSubmitting] = useState(false)
  
  const handleSubmit = useCallback(async () => {
    console.log(updatedRecruitment)
    // Defence duplicate submission
    if (submitting) return
    setSubmitting(true)
    if (props.onPress) {
      props.onPress()
    }
    
    try {
      // TODO Document the error handling
      const processedRecruitment = await createRecruitment(updatedRecruitment);
      console.log('Recruitment created:', processedRecruitment);
      
      setSongTitle('')
      setArtist('')
      setName('')
      setGenres([])
      setDeadline('')
      setRequiredGenerations([])
      setRequiredGenders([])
      setRecruitedInstruments(new Map([]))
      setMemo('')
    } catch (error) {
      console.error('Error creating recruitment:', error);
    } finally {
      setSubmitting(false)
    }
  }, [
    songTitle,
    artist,
    name,
    genres,
    deadline,
    requiredGenerations,
    requiredGenders,
    recruitedInstruments,
    memo,
  ])
  
  return (
    <>
      <div className={styles.itemsSetVertical}>
        <div className={styles.itemsSetHorizontal}>
          <InputForm
            title="曲名"
            displayedRequired={false}
            textBoxProps={
              {
                isDisabled: false,
                onChange: handleSongTitleChange
              }
            }
          />
          <InputForm
            title="アーティスト名"
            displayedRequired={false}
            textBoxProps={
              {
                isDisabled: false,
                onChange: handleArtistChange
              }
            }
          />
        </div>
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
            onChange={handleGenres}
          />
          <InputForm
            title="コラボ名"
            displayedRequired={false}
            textBoxProps={
              {
                isDisabled: false,
                onChange: handleNameChange
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
                onChange: handleDeadline,
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
            onChange={handleRequiredGenerations}
          />
        </div>
        <div className={styles.itemsSetHorizontal}>
          <Checkbox
            props={{
              defaultSelected: false,
            }}
            options={requiredGenderOptions}
            selectedValues={requiredGenders}
            onChange={handleRequiredGenders}
          />
        </div>
        <div className={styles.itemsSetHorizontal}>
          {inputs.map((input) => (
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
          onChange={handleMemoChange}
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
    </>
  )
}

export default CreateRecruitmentForm