"use client"

import styled from "styled-components";
import {NextPage} from "next";
import styles from "./Home.module.css"
import Page from "@/app/pages/badge";
import Page2 from "@/app/pages/button";
import Page3 from "@/app/pages/mixin";
import Page4 from "@/app/pages/extend";

const H1 = styled.h1`
    color: red;  
`

const Home: NextPage = () => {
  return(
    <div className={styles.container}>
      <main className={styles.main}>
        ...
        <H1>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </H1>
        <div>
          <Page/>
          <Page2/>
          <Page3/>
          <Page4/>
        </div>
      </main>
    </div>
  )
}

export default Home