"use client"

import * as styles from "./createRecruitmentPage.css"
import React from "react";
import {CreateRecruitmentRequest} from "./CreateRecruitment";
import CreateRecruitmentForm from "@/features/collab/recruitment/create/ui/createRecruitment";

export const CreateRecruitmentPage = (props: CreateRecruitmentRequest) => {
  return (
    <div>
      <p className={styles.headline1}>メンバーを募集する</p>
      <p className={styles.headline2}>募集するコラボの基本情報</p>
      <CreateRecruitmentForm
        owner={props.owner}
        songTitle={props.songTitle}
        artist={props.artist}
        name={props.name}
        genre={props.genre}
        deadline={props.deadline}
        requiredGenerations={props.requiredGenerations}
        requiredGender={props.requiredGender}
      />
    </div>
  );
};
