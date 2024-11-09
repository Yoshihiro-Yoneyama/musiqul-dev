"use client"

import React from "react";
import {CreateRecruitmentRequest} from "./CreateRecruitment";
import * as styles from "./collab.css"
import CreateRecruitmentForm from "@/features/collab/recruitment/create/ui/createRecruitment";


const Page = (props: CreateRecruitmentRequest) => {
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

export default Page;