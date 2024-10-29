import {FormEvent} from "react";
import api from "@/utils/axios/axios.config";

type RecruitmentRequest = {
  owner: string,
  songTitle: string,
  artist: string,
  name: string,
  genre: string,
  deadline: Date
  // ownerInstruments: string[],
  // recruitedInstruments: string[],
  // requiredGenerations: string[],
  // requiredGender: string,
}


export const createRecruitment = async (event: FormEvent<HTMLFormElement>) => {
  // フォームデータの取得
  const formData = new FormData(event.currentTarget);
  
  // チェックボックスの値を取得（`genre` の配列を正しく取得するため）
  // const genres: string[] = formData.getAll("genre").map(String);
  
  // Recruitment型に翻訳
  const recruitmentData: RecruitmentRequest = {
    owner: formData.get("owner") as string,
    songTitle: formData.get("songTitle") as string,
    artist: formData.get("artist") as string,
    name: formData.get("name") as string,
    genre: formData.get("genre") as string,
    deadline: new Date(formData.get("deadline") as string) // Date型に変換
    // ownerInstruments: (formData.get("ownerInstruments") as string).split(","), // カンマ区切りで配列に
    // recruitedInstruments: (formData.get("recruitedInstruments") as string).split(","),
    // requiredGenerations: (formData.get("requiredGenerations") as string).split(","),
    // requiredGender: formData.get("requiredGender") as string,
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