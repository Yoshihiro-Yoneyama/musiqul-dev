"use client"

import React, {useState} from "react";
import {createRecruitment} from "@/app/collab/recruitment/component/createRecruitment";
import Button from "@/components/atoms/button/Button";
import BorderButton from "@/components/atoms/button/BorderButton";
import InputForm from "@/components/molecules/input-form/InputForm";
import * as styles from "./collab.css"
import InputSelector from "@/components/molecules/input-selector/InputSelector";
import DateCalendar from "@/components/atoms/datepicker/DateCalendar";

type Option = {
  value: string;
  label: string;
}

const genres: Option[] = [
  { value: '', label: '' },
  { value: 'Rock', label: 'ロック' },
  { value: 'Jazz', label: 'ジャズ' },
  { value: 'Pop', label: 'ポップ' },
];


const Recruitment = () => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  
  const handleChange = (value: string) => {
    setSelectedValue(value); // 値を更新して表示する
  };
  
  const onSubmit = () => {}
  
  return (
    <div>
      <p className={styles.headline1}>メンバーを募集する</p>
      <p className={styles.headline2}>募集するコラボの基本情報</p>
      <form onSubmit={event => createRecruitment(event)}>
        <div className={styles.itemsSetVertical}>
          <div className={styles.itemsSetSideBySide}>
            <InputForm id={"songTitle"} name={"songTitle"} title={"曲名"} disabled={false}/>
            <InputForm id={"artist"} name={"artist"} title={"アーティスト名"} disabled={false}/>
          </div>
          {/*チェックボックスの選択肢を自動で表示したい*/}
          {/*選択解除後も文字を白で表示したい*/}
          {/*ドロップダウンリストの下矢印を白で表示したい*/}
          <div className={styles.itemsSetSideBySide}>
            <InputSelector
              title={"ジャンル"}
              name={"genre"}
              options={genres.map(value => value)}
              onChange={handleChange}
              selectedValue={selectedValue}
              disabled={false}
            />
            <InputForm id={"name"} name={"name"} title={"コラボ名"} disabled={false}/>
          </div>
          <DateCalendar name={"deadline"} disabled={false}/>
        </div>
        
        
        {/*<label>*/}
        {/*  ジャンル:*/}
        {/*  <label>*/}
        {/*    <input*/}
        {/*      type="checkbox"*/}
        {/*      name="genre"*/}
        {/*      value="Rock"*/}
        {/*    />*/}
        {/*    Rock*/}
        {/*  </label>*/}
        {/*  <label>*/}
        {/*    <input*/}
        {/*      type="checkbox"*/}
        {/*      name="genre"*/}
        {/*      value="Jazz"*/}
        {/*    />*/}
        {/*    Jazz*/}
        {/*  </label>*/}
        {/*  <label>*/}
        {/*    <input*/}
        {/*      type="checkbox"*/}
        {/*      name="genre"*/}
        {/*      value="Pop"*/}
        {/*    />*/}
        {/*    Pop*/}
        {/*  </label>*/}
        {/*</label>*/}
        {/*<label>*/}
        {/*  コラボ元の楽器: <input name="ownerInstruments"/>*/}
        {/*</label>*/}
        {/*<br/>*/}
        {/*<label>*/}
        {/*  募集楽器: <input name="recruitedInstruments"/>*/}
        {/*</label>*/}
        {/*<label>*/}
        {/*  人数: <input name="countOfInstruments"/>*/}
        {/*</label>*/}
        {/*<br/>*/}
        {/*<input type="submit" defaultValue={"登録する"}/>*/}
        <Button variant={"default"} onClick={onSubmit}>
          登録する
        </Button>
        <br/>
        <BorderButton variant={"default"} onClick={onSubmit}>
          登録する
        </BorderButton>
      </form>
    </div>
  );
};

export default Recruitment;