"use client"

import styled from "styled-components";
import {NextPage} from "next";
import Page from "@/app/pages/badge";
import Page2 from "@/app/pages/button";
import Page3 from "@/app/pages/mixin";
import Page4 from "@/app/pages/extend";
import {useRouter} from "next/navigation";


const H1 = styled.h1`
    color: red;  
`


const Home: NextPage = () => {


  const useRouter1 = useRouter()

  const onSubmit = () => {
    useRouter1.push('/practice-dom')
    // router.push({
    //   pathname: '/practice-dom',
    //   query: {keyword: "hello"}
    // }).then(r => r.valueOf())
  }


  return(
    <div>
      <main>
        ...
        <H1>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </H1>
        <div>
          <Page/>
          <Page2/>
          <Page3/>
          <Page4/>
          <button onClick={onSubmit}>ボタン</button>
        </div>
      </main>
    </div>
  )
}

export default Home