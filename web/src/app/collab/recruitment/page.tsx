"use client"

import React, {useState} from "react";
import {createRecruitment} from "@/app/collab/recruitment/component/createRecruitment";
import Button from "@/components/atoms/button/Button";
import BorderButton from "@/components/atoms/button/BorderButton";
import InputForm from "@/components/molecules/input-form/InputForm";
import * as styles from "./collab.css"
import Selector from "@/components/atoms/selector/Selector";

type Option = {
  value: string;
  label: string;
}

const options: Option[] = [
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
        <div className={styles.itemsSetSideBySide}>
          <InputForm id={"songTitle"} name={"songTitle"} title={"曲名"} disabled={false}/>
          <InputForm id={"artist"} name={"artist"} title={"アーティスト名"} disabled={false}/>
        </div>
        <br/>
        {/*チェックボックスの選択肢を自動で表示したい*/}
        <Selector name={"genre"} options={options.map(value => value)} onChange={handleChange} value={selectedValue} disabled={false}/>
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
        <br/>
        <label>
          曲名: <input name="songTitle"/>
        </label>
        <br/>
        <label>
          アーティスト名: <input name="artist"/>
        </label>
        <br/>
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