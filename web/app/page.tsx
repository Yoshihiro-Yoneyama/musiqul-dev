"use client";

import React from "react";
import * as styles from "./styles.css";
import {useRouter} from "next/navigation";

const HomePage = () => {
  
  const useRouter1 = useRouter()
  
  const onSubmit = () => {
    useRouter1.push('/collab/recruitment')
  }
  
  return (
    <main className={styles.Container}>
      <div className={styles.Container}>Hello World🙌</div>
      <button onClick={onSubmit}/>
    </main>
  );
};

export default HomePage;