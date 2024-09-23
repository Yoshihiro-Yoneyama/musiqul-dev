"use client";

import React from "react";
import styled from "styled-components";
import {useRouter} from "next/navigation";
import Button2 from "@/components/atoms/Button2";

const HomePageStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #000000;
    font-family: Arial, sans-serif;
    color: #ffffff;

    h1 {
        font-size: 2.5rem;
    }
`;


const HomePage = () => {

  const useRouter1 = useRouter()

  const onSubmit = () => {
    useRouter1.push('/collab/recruitment')
  }

  return (
    <HomePageStyle>
      <h1>Welcome to My Web App!</h1>
      <Button2
        color="white"
        background="blue"
        label="Go to Page"
        onClick={onSubmit}
      />
    </HomePageStyle>
  );
};

export default HomePage;