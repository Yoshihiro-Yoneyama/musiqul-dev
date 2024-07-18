'use client'
import React from "react";

const name: String = "reactaaaaaaaaaaaaaaa"

const DisplayStringOfReact = () => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }

  return (
    <div>
      <label htmlFor="name">{name}</label>
      <input id="name" type="text" onChange={onChange} />
    </div>
  )
}

export default DisplayStringOfReact