"use client"

import React from "react";
import {useRouter} from "next/navigation";
import Button from "@/components/atoms/Button";

const Recruitment = () => {

  const useRouter1 = useRouter()

  const onSubmit = () => {
    useRouter1.push('/')
  }

  return (

    <h1>コラボを登録する
      <form method="post">
        {/*<div className={styles.recruitment}>*/}
        {/*  <label>*/}
        {/*    コラボ名: <input className="name" id="name" name="name"/>*/}
        {/*  </label>*/}
        {/*  <hr/>*/}
        {/*  <label>*/}
        {/*    ジャンル: <input name="genre"/>*/}
        {/*  </label>*/}
        {/*  <hr/>*/}
        {/*  <label>*/}
        {/*    曲名: <input name="songTitle"/>*/}
        {/*  </label>*/}
        {/*  <hr/>*/}
        {/*  <label>*/}
        {/*    アーティスト名: <input name="artist"/>*/}
        {/*  </label>*/}
        {/*  <hr/>*/}
        {/*  <label>*/}
        {/*    コラボ元の楽器: <input name="ownerInstruments"/>*/}
        {/*  </label>*/}
        {/*  <hr/>*/}
        {/*  <label>*/}
        {/*    募集楽器: <input name="recruitedInstruments"/>*/}
        {/*  </label>*/}
        {/*  <label>*/}
        {/*    人数: <input name="countOfInstruments"/>*/}
        {/*  </label>*/}
        {/*  <h3>募集条件</h3>*/}
        {/*  <hr/>*/}
        {/*</div>*/}

        {/*<NavigateButton/>*/}
        {/*<button type="submit">Submit form</button>*/}
      </form>
      <Button
        color="white"
        background="blue"
        label="Go to Page"
        onClick={onSubmit}
      />
    </h1>
  );
};

export default Recruitment;