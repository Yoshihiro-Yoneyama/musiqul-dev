import {FormEvent} from "react";
import api from "@/shared/config/axios";

export type CreateRecruitmentRequest = {
  owner: string,
  // ownerInstruments: string[],
  songTitle: string,
  artist: string,
  name: string,
  genre: string,
  deadline: Date,
  requiredGenerations: string[],
  requiredGender: string[],
  // map形式
  // recruitedInstruments: string[],
}


export const createRecruitment = async (event: FormEvent<HTMLFormElement>) => {
  // フォームデータの取得
  const formData = new FormData(event.currentTarget);
  
  // チェックボックスの値を取得（`requiredGenerations` の配列を正しく取得するため）
  // const requiredGenerations: string[] = formData.getAll("requiredGenerations").map(String);
  
  // Recruitment型に翻訳
  const recruitmentData: CreateRecruitmentRequest = {
    owner: formData.get("owner") as string,
    // ownerInstruments: (formData.get("ownerInstruments") as string).split(","), // カンマ区切りで配列に
    songTitle: formData.get("songTitle") as string,
    artist: formData.get("artist") as string,
    name: formData.get("name") as string,
    genre: formData.get("genre") as string,
    deadline: new Date(formData.get("deadline") as string), // Date型に変換
    requiredGenerations: (formData.getAll("requiredGenerations").map(String)),
    requiredGender: (formData.getAll("requiredGender").map(String)),
    // recruitedInstruments: (formData.get("recruitedInstruments") as string).split(","),
  };
  
  // APIリクエスト送信
  event.preventDefault();
  try {
    await api.post('/recruitment', recruitmentData);
    console.log("Recruitment data sent successfully");
  } catch (error) {
    console.error("Error sending recruitment data:", error);
  }
};