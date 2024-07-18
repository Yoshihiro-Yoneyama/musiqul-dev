"use client"
import {useEffect, useState} from "react";



const Counter2 = () => {
  const [count, setCount2] = useState(1)

  const handleClick = () => {
    setCount2(prevState => prevState+prevState)
  }

  useEffect(() => {
    console.log("PIPIPI")
  }, [count]);

  return (
    <div>
      <h1>UseState</h1>
      <button onClick={handleClick}>+</button>
      <p>{count}</p>
    </div>
  )
}

export default Counter2