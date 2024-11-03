"use client"

import React, {useState} from "react";
import {createRecruitment} from "@/app/collab/recruitment/component/createRecruitment";
import Button from "@/components/atoms/button/Button";
import BorderButton from "@/components/atoms/button/BorderButton";
import InputForm from "@/components/molecules/input-form/InputForm";
import * as styles from "./collab.css"
import InputSelector from "@/components/molecules/input-selector/InputSelector";
import InputCalendar from "@/components/molecules/input-calendar/InputCalendar";

type Option = {
  value: string;
  label: string;
}

const genres: Option[] = [
  {value: '', label: ''},
  {value: 'Rock', label: 'ロック'},
  {value: 'Jazz', label: 'ジャズ'},
  {value: 'Pop', label: 'ポップ'},
];


const Recruitment = () => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  
  const handleChange = (value: string) => {
    setSelectedValue(value); // 値を更新して表示する
  };
  
  const onSubmit = () => {
  }
  
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
          <div className={styles.itemsSetSideBySide}>
            <InputCalendar id={"deadline"} title={"募集締切日"} name={"deadline"} disabled={false}/>
          </div>
          <p className={styles.headline2}>応募するメンバー</p>
          {/*チェックボックスの選択肢を自動で表示したい*/}
          <label>
            <p>年齢:</p>
            <label>
              <input
                type="checkbox"
                name="requiredGenerations"
                value="TEEN"
              />
              <p>10代</p>
            </label>
            <label>
              <input
                type="checkbox"
                name="requiredGenerations"
                value="TWENTIES"
              />
              <p>20代</p>
            </label>
            <label>
              <input
                type="checkbox"
                name="requiredGenerations"
                value="THIRTIES"
              />
              <p>30代</p>
            </label>
            <label>
              <input
                type="checkbox"
                name="requiredGenerations"
                value="FORTIES"
              />
              <p>40代</p>
            </label>
            <label>
              <input
                type="checkbox"
                name="requiredGenerations"
                value="FIFTIES"
              />
              <p>50代</p>
            </label>
            <label>
              <input
                type="checkbox"
                name="requiredGenerations"
                value="MORE_THAN_SIXTIES"
              />
              <p>60代以上</p>
            </label>
          </label>
        </div>
        
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