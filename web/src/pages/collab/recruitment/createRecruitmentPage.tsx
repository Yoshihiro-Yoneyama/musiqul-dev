"use client"

import * as styles from "./createRecruitmentPage.css"
import React from "react";
import CreateRecruitmentForm from "@/features/collab/recruitment/ui/create/createRecruitment";

// 募集ページ

export const CreateRecruitmentPage = () => {
  return (
    <div>
      <p className={styles.headline1}>メンバーを募集する</p>
      <p className={styles.headline2}>募集するコラボの基本情報</p>
      <CreateRecruitmentForm/>
    </div>
  );
};
