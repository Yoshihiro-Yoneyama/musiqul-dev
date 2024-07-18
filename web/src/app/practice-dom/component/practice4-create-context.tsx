"use client"

import React from "react";

const TitleContext = React.createContext("")

const Title2 = () => {
  return (
    <TitleContext.Consumer>
      {(title) => {
        return <h1>{title}</h1>
      }}
    </TitleContext.Consumer>
  )
}

const Header = () => {
  return (
    <div>
      <Title2/>
    </div>
  )
}

const Page = () => {
  const title = "ANKO"

  return (
    <TitleContext.Provider value = {title}>
      <Header />
    </TitleContext.Provider>
  )
}

export default Page

