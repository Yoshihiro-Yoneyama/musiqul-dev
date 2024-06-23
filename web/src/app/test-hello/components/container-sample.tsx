import React from "react";

type ContainerProps = {
  title: string
  children: React.ReactNode
}

const Container2 = (props: ContainerProps): JSX.Element => {
  const {title, children} = props

  return (
    <div style={{background: "red"}}>
      <span>{title}</span>
      <div>{children}</div>
    </div>
  )
}

const Container = (props: { title: string; children: React.ReactElement }) => {
  const {title, children} = props;

  return (
    <div style={{background: "red"}}>
      <span>{title}</span>
      <div>{children}</div>
    </div>
  )
}

const Parent = () => {
  return (
    <Container2 title={"Hello"}>
      <p>ここに背景色が現れます</p>
    </Container2>
  )
}

export default Parent;