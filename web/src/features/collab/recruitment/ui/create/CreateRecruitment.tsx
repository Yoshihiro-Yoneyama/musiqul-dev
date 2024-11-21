'use client'

import * as styles from "./createRecruitment.css";
import InputSelector from "@/shared/ui/molecules/input-selector/InputSelector";
import InputCalendar from "@/shared/ui/molecules/input-calendar/InputCalendar";
import Checkbox from "@/shared/ui/atoms/checkbox/Checkbox";
import ComboInput from "@/shared/ui/molecules/combo-input/ComboInput";
import BorderButton from "@/shared/ui/atoms/button/BorderButton";
import Button from "@/shared/ui/atoms/button/Button";
import React, {useCallback, useState} from "react";
import {useRecruitment} from "@/entities/collab/recruitment/recruitment.state";
import {createRecruitment} from "@/features/collab/recruitment/model/createRecruitment";
import InputForm from "@/shared/ui/molecules/input-form/InputForm";
import {
  genres,
  recruitedInstruments,
  requiredGenders,
  requiredGenerationOptions,
  requiredNumberOfInstruments
} from "@/features/collab/recruitment/model/options";

type Props = {
  onPress?: () => void
  isDisabled: boolean
}

const CreateRecruitmentForm = (props: Props) => {
  const [songTitle, setSongTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [name, setName] = useState('')
  const [genre, setGenre] = useState<string[]>([])
  const [deadline, setDeadline] = useState('')
  const [requiredGenerations, setRequiredGenerations] = useState<string[]>([])
  const [requiredGender, setRequiredGender] = useState('')
  
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
  const handleGenre = (values: string[]) => {
    setGenre(values)
    setUpdatedRecruitment({
      ...updatedRecruitment,
      genres: values || [],
    })
  }
  // const handleDeadline = (value: string) => {
  //   setDeadline(value)
  //   updateRecruitment({deadline: value})
  // }
  const handleRequiredGenerations = (values: string[]) => {
    setRequiredGenerations(values)
    setUpdatedRecruitment({
      ...updatedRecruitment,
      requiredGenerations: values || [],
    })
  }
  const handleRequiredGender = (value: string) => {
    setRequiredGender(value);
    setUpdatedRecruitment({
      ...updatedRecruitment, // 現在の状態を展開
      requiredGender: value || '', // 必要なプロパティを上書き
    });
  };
  
  const [submitting, setSubmitting] = useState(false)
  
  const handleSubmit = useCallback(async () => {
    // Defence duplicate submission
    if (submitting) return
    setSubmitting(true)
    if (props.onPress) {
      props.onPress()
    }
    
    // Update the recruitment state
    setUpdatedRecruitment(updatedRecruitment)
    
    try {
      // TODO Document the error handling
      const processedRecruitment = await createRecruitment(updatedRecruitment); // APIリクエスト
      console.log('Recruitment created:', processedRecruitment);
      
      setSongTitle('')
      setArtist('')
      setName('')
      setGenre([])
      setDeadline('')
      setRequiredGenerations([])
      setRequiredGender('')
    } catch (error) {
      console.error('Error creating recruitment:', error);
    } finally {
      setSubmitting(false)
    }
  }, [
    songTitle,
    artist,
    name,
    genre,
    deadline,
    requiredGenerations,
    requiredGender,
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
                name: "songTitle",
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
                name: "artist",
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
            options={genres}
            selectedValues={genre}
            onChange={handleGenre}
          />
          <InputForm
            title="コラボ名"
            displayedRequired={false}
            textBoxProps={
              {
                name: "name",
                isDisabled: false,
                onChange: handleNameChange
              }
            }
          />
        </div>
        <div className={styles.itemsSetHorizontal}>
          <InputCalendar id={"deadline"} title={"募集締切日"} name={"deadline"} disabled={false}
                         displayedRequired={true}/>
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
          <InputSelector
            title={"性別"}
            displayedRequired={true}
            selectorProps={
              {
                selectedValue: updatedRecruitment.requiredGender,
                options: requiredGenders,
                defaultOptionLabel: '選択してください。',
                isDisabled: false,
                onChange: handleRequiredGender,
              }
            }
          />
        </div>
        <div className={styles.itemsSetHorizontal}>
          {/*選択項目が消える*/}
          {/*<InputSelector*/}
          {/*  title={"楽器"}*/}
          {/*  name={"recruitedInstruments"}*/}
          {/*  options={recruitedInstruments.map(value => value)}*/}
          {/*  onChange={handleGenreChange}*/}
          {/*  selectedValue={genre}*/}
          {/*  disabled={false}*/}
          {/*  displayedRequired={true}*/}
          {/*/>*/}
          {/*<Selector*/}
          {/*  name={"numberOfPeople"}*/}
          {/*  options={[*/}
          {/*    {value: '0', label: '0'},*/}
          {/*    {value: '1', label: '1'},*/}
          {/*  ]}*/}
          {/*  onChange={handleGenreChange}*/}
          {/*  selectedValue={genre}*/}
          {/*/>*/}
        </div>
        <div className={styles.itemsSetHorizontal}>
          <ComboInput
            id={"recruitedInstruments"}
            name={"recruitedInstruments"}
            options1={recruitedInstruments.map(value => value)}
            options2={requiredNumberOfInstruments.map(value => value)}
            disabled={false}
          />
        </div>
        <div className={styles.itemsSetHorizontal}>
          <BorderButton variant={"default"} onClick={() => {
          }}>
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

export default CreateRecruitmentForm;