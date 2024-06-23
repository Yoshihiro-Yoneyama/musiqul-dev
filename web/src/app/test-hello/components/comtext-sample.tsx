import React from "react";

const TitleContext = React.createContext("")

const Title = () => {
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
      <Title/>
    </div>
  )
}

const HeaderContent = () => {
  const title = "React"

  return (
    <TitleContext.Provider value={title}>
      <Header/>
    </TitleContext.Provider>
  )
}

export default HeaderContent