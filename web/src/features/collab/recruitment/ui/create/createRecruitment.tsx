'use client'

import * as styles from "./createRecruitment.css";
import InputForm from "@/shared/ui/molecules/input-form/InputForm";
import InputSelector from "@/shared/ui/molecules/input-selector/InputSelector";
import InputCalendar from "@/shared/ui/molecules/input-calendar/InputCalendar";
import Checkbox from "@/shared/ui/atoms/checkbox/Checkbox";
import ComboInput from "@/shared/ui/molecules/combo-input/ComboInput";
import BorderButton from "@/shared/ui/atoms/button/BorderButton";
import Button from "@/shared/ui/atoms/button/Button";
import React, {FC, useCallback, useState} from "react";
import {createRecruitment} from "@/pages/collab/recruitment/CreateRecruitment";
import {type RecruitmentSchema} from "@/entities/collab/recruitment/recruitment.model";

type SelectorOption = {
  value: string;
  label: string;
}

const genres: SelectorOption[] = [
  {value: '', label: ''},
  {value: 'ROCK', label: 'ロック'},
  {value: 'JAZZ', label: 'ジャズ'},
  {value: 'POP', label: 'ポップ'},
];

const requiredNumberOfInstruments: SelectorOption[] = [
  {value: '0', label: '0'},
  {value: '1', label: '1'},
  {value: '2', label: '2'},
  {value: '3', label: '3'},
  {value: '4', label: '4'},
  {value: '5', label: '5'},
  {value: '6', label: '6'},
  {value: '7', label: '7'},
  {value: '8', label: '8'},
  {value: '9', label: '9'},
  {value: '10', label: '10'},
]

const recruitedInstruments: SelectorOption[] = [
  {value: '', label: ''},
  {value: 'VOCAL', label: 'ボーカル'},
  {value: 'GITTER', label: 'ギター'},
  {value: 'ELECTRIC_BASE', label: 'エレキベース'},
];

type CheckboxOption = {
  value: string;
  label: string;
};

const requiredGenders: CheckboxOption[] = [
  {value: 'MALE_ONLY', label: '男性'},
  {value: 'MALE_ONLY', label: '女性'},
  {value: 'ALL', label: '不問'},
];

const requiredGenerations: CheckboxOption[] = [
  {value: 'TEEN', label: '10代'},
  {value: 'TWENTIES', label: '20代'},
  {value: 'THIRTIES', label: '30代'},
  {value: 'FORTIES', label: '40代'},
  {value: 'FIFTIES', label: '50代'},
  {value: 'MORE_THAN_SIXTIES', label: '60代以上'},
]

const CreateRecruitmentForm: FC = () => {
  const [owner, setOwner] = useState('')
  const [songTitle, setSongTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [name, setName] = useState('')
  const [genre, setGenre] = useState([])
  const [deadline, setDeadline] = useState('')
  const [requiredGenerations, setRequiredGenerations] = useState([])
  const [requiredGender, setRequiredGender] = useState('')
  
  const updateRecruitment = (updates: Partial<RecruitmentSchema>) => {
    const newItem: RecruitmentSchema = {
      owner,
      songTitle,
      artist,
      name,
      genre,
      deadline,
      requiredGenerations,
      requiredGender,
    }
    updateRecruitment(newItem)
  }
  
  const handleSongTitleChange = (value: string) => {
    setSongTitle(value)
    updateRecruitment({songTitle: value})
  }
  const handleArtistChange = (value: string) => {
    setArtist(value)
    updateRecruitment({artist: value})
  }
  
  
  
  const [submitting, setSubmitting] = useState(false)
  
  const postData: RecruitmentSchema = {
    owner,
    songTitle,
    artist,
    name,
    genre,
    deadline,
    requiredGenerations,
    requiredGender
  }
  
  const handleSubmit = useCallback(async () => {
    if (submitting) return
    setSubmitting(true)
    
    const postData: RecruitmentSchema = {
      owner,
      songTitle,
      artist,
      name,
      genre,
      deadline,
      requiredGenerations,
      requiredGender,
    }
    
    try {
      setSongTitle('')
      setArtist('')
      setName('')
    } finally {
      setSubmitting(false)
    }
    
  }, [
    owner,
    songTitle,
    artist,
    name,
    genre,
    deadline,
    requiredGenerations,
    requiredGender,
  ])
  

  
  return (
    <form onSubmit={event => createRecruitment(event)}>
      <div className={styles.itemsSetVertical}>
        <div className={styles.itemsSetHorizontal}>
          <InputForm
            id={"songTitle"}
            name={"songTitle"}
            title={"曲名"}
            disabled={false}
            displayedRequired={false}
          />
          <InputForm
            id={"artist"}
            name={"artist"}
            title={"アーティスト名"}
            disabled={false}
            displayedRequired={false}
          />
        </div>
        {/*選択解除後も文字を白で表示したい*/}
        {/*ドロップダウンリストの下矢印を白で表示したい*/}
        <div className={styles.itemsSetHorizontal}>
          <InputSelector
            title={"ジャンル"}
            name={"genre"}
            options={genres.map(value => value)}
            onChange={handleSongTitleChange}
            selectedValue={""}
            disabled={false}
            displayedRequired={true}
          />
          <InputForm id={"name"} name={"name"} title={"コラボ名"} disabled={false} displayedRequired={true}/>
        </div>
        <div className={styles.itemsSetHorizontal}>
          <InputCalendar id={"deadline"} title={"募集締切日"} name={"deadline"} disabled={false}
                         displayedRequired={true}/>
        </div>
        <p className={styles.headline2}>応募するメンバー</p>
        <div className={styles.itemsSetHorizontal}>
          <Checkbox
            id={'requiredGenerations'}
            title={'年齢'}
            name={'requiredGenerations'}
            options={requiredGenerations}
          />
        </div>
        <div className={styles.itemsSetHorizontal}>
          <Checkbox
            id={'requiredGenders'}
            title={'性別'}
            name={'requiredGenders'}
            options={requiredGenders}
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
          <Button variant={"default"} onClick={() => {
          }}>
            内容を確認する→
          </Button>
          <br/>
        </div>
      </div>
    </form>
  )
}

export default CreateRecruitmentForm;