import {FormEvent} from "react";
import api from "@/utils/axios/axios.config";

type RecruitmentRequest = {
  name: string,
  owner: string,
  genre: string,
  songTitle: string,
  artist: string,
  // ownerInstruments: string[],
  // recruitedInstruments: string[],
  // requiredGenerations: string[],
  // requiredGender: string,
  // deadline: Date
}


export const createRecruitment = async (event: FormEvent<HTMLFormElement>) => {
  // フォームデータの取得
  const formData = new FormData(event.currentTarget);
  
  // チェックボックスの値を取得（`genre` の配列を正しく取得するため）
  // const genres: string[] = formData.getAll("genre").map(String);
  
  // Recruitment型に翻訳
  const recruitmentData: RecruitmentRequest = {
    name: formData.get("name") as string,  // 必須フィールドなので型アサーション
    owner: formData.get("owner") as string, // 必須フィールドなので型アサーション
    genre: formData.get("genre") as string,
    songTitle: formData.get("songTitle") as string,
    artist: formData.get("artist") as string,
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
};