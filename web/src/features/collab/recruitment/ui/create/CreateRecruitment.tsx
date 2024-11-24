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
  requiredGenderOptions,
  requiredGenerationOptions
} from "@/features/collab/recruitment/model/options";

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
  const [recruitedInstruments, setRecruitedInstruments] = useState(new Map([]))
  
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
    setRequiredGenders(values);
    setUpdatedRecruitment({
      ...updatedRecruitment,
      requiredGenders: values || [],
    });
  };
  const handleRecruitedInstruments = (mapValues: Map<string, number>) => {
    setRecruitedInstruments(mapValues)
    setUpdatedRecruitment({
      ...updatedRecruitment,
      recruitedInstruments: mapValues || new Map([]),
    })
  }
  
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