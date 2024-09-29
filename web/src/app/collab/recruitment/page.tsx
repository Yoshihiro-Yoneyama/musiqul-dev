"use client"

import React, {FormEvent} from "react";
import {useRouter} from "next/navigation";
import Button from "@/components/atoms/Button";
import axios from "axios";
import api from "@/utils/axios/axios.config";

type Recruitment = {
  name: string,
  // owner: string,
  // genres: string[],
  songTitle: string,
  // artist: string,
  // ownerInstruments: string[],
  // recruitedInstruments: string[],
  // requiredGenerations: string[],
  // requiredGender: string,
  // deadline: Date
}

const Recruitment = () => {

  const useRouter1 = useRouter()
  const onSubmit = () => {
    // useRouter1.push('/')
  }
  

  
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    
    // フォームデータの取得
    const formData = new FormData(event.currentTarget);
    
    // Recruitment型に翻訳
    const recruitmentData: Recruitment = {
      name: formData.get("name") as string,  // 必須フィールドなので型アサーション
      // owner: formData.get("owner") as string, // 必須フィールドなので型アサーション
      // genres: (formData.get("genres") as string).split(","), // 配列に変換
      songTitle: formData.get("songTitle") as string,
      // artist: formData.get("artist") as string,
      // ownerInstruments: (formData.get("ownerInstruments") as string).split(","), // カンマ区切りで配列に
      // recruitedInstruments: (formData.get("recruitedInstruments") as string).split(","),
      // requiredGenerations: (formData.get("requiredGenerations") as string).split(","),
      // requiredGender: formData.get("requiredGender") as string,
      // deadline: new Date(formData.get("deadline") as string) // Date型に変換
    };
    
    // APIリクエスト送信
    event.preventDefault();
    try {
      await api.post('/recruitment', recruitmentData);
      console.log("Recruitment data sent successfully");
    } catch (error) {
      console.error("Error sending recruitment data:", error);
    }
    
    
    // event.preventDefault();
    // const data = new FormData(event.currentTarget)
    // await api.post('/recruitment', {
    //   name: data.get("name")
    // })
  }

  return (
    <h1>コラボを登録する
      <form onSubmit={event => handleSubmit(event)}>
        <div>
          <label>
            コラボ名: <input id="name" name="name"/>
          </label>
          <hr/>
          {/*<label>*/}
          {/*  ジャンル: <input name="genre"/>*/}
          {/*</label>*/}
          {/*<hr/>*/}
          <label>
            曲名: <input name="songTitle"/>
          </label>
          {/*<hr/>*/}
          {/*<label>*/}
          {/*  アーティスト名: <input name="artist"/>*/}
          {/*</label>*/}
          {/*<hr/>*/}
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
          <hr/>
          {/*<input type="submit" defaultValue={"Submit"}/>*/}
          <Button
            color="white"
            background="blue"
            label="登録する"
            onClick={onSubmit}
          />
        </div>
        
        {/*<Button*/}
        {/*  color="white"*/}
        {/*  background="blue"*/}
        {/*  label="Go to Page"*/}
        {/*  onClick={onSubmit}*/}
        {/*/>*/}
      </form>
    </h1>
  );
};

export default Recruitment;