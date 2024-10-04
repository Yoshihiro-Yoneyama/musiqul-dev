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
    <main className={styles.container}>
      <div className={styles.container}>Hello World🙌</div>
      <button onClick={onSubmit}/>
    </main>
  );
};

export default HomePage;