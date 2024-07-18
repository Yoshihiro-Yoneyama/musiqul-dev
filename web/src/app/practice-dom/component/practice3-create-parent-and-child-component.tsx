"use client"
import React from "react";

type Children = {
  title: string
  children: React.ReactNode
}

const Container2 = (props: Children): JSX.Element => {
  const {title, children} = props

  return (
    <div style={{background: "red"}}>
      <span>{title}</span>
      <div>{children}</div>
    </div>
  )
}

const Parent = (): JSX.Element => {
  return (
    <Container2 title="Hello">
      <p>this area is covered red</p>
    </Container2>
  )
}

export default Parent