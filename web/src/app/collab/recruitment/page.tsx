"use client"

import React from "react";
import {createRecruitment} from "@/app/collab/recruitment/component/createRecruitment";
import Button from "@/components/atoms/button/Button";
import BorderButton from "@/components/atoms/button/BorderButton";
import TextBox from "@/components/atoms/textbox/TextBox";

const Recruitment = () => {
  const onSubmit = () => {}
  return (
    <h1>コラボを登録する
      <form onSubmit={event => createRecruitment(event)}>
        {/*<label>*/}
        {/*  コラボ名: <input id="name" name="name"/>*/}
        {/*</label>*/}
        <div>
          コラボ名:　<TextBox id={"name"} name={"name"} disabled={false}/>
        </div>
        <hr/>
        {/*チェックボックスの選択肢を自動で表示したい*/}
        <label>
          ジャンル:
          <label>
            <input
              type="checkbox"
              name="genre"
              value="Rock"
            />
            Rock
          </label>
          <label>
            <input
              type="checkbox"
              name="genre"
              value="Jazz"
            />
            Jazz
          </label>
          <label>
            <input
              type="checkbox"
              name="genre"
              value="Pop"
            />
            Pop
          </label>
        </label>
        <hr/>
        <label>
          曲名: <input name="songTitle"/>
        </label>
        <hr/>
          <label>
            アーティスト名: <input name="artist"/>
          </label>
        <hr/>
        {/*<label>*/}
        {/*  コラボ元の楽器: <input name="ownerInstruments"/>*/}
        {/*</label>*/}
        {/*<hr/>*/}
        {/*<label>*/}
        {/*  募集楽器: <input name="recruitedInstruments"/>*/}
        {/*</label>*/}
        {/*<label>*/}
        {/*  人数: <input name="countOfInstruments"/>*/}
        {/*</label>*/}
        {/*<hr/>*/}
        {/*<input type="submit" defaultValue={"登録する"}/>*/}
        <Button variant={"default"} onClick={onSubmit}>
          登録する
        </Button>
        <hr/>
        <BorderButton variant={"default"} onClick={onSubmit}>
           登録する
        </BorderButton>
      </form>
    </h1>
  );
};

export default Recruitment;