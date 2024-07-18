import {useReducer, useState} from "react";

type Action = 'DECREMENT' | 'INCREMENT' | 'DOUBLE' | 'RESET'

const reducer = (currCount: number, action: Action) => {
  switch (action) {
    case "INCREMENT":
      return currCount + 1
    case "RESET":
      return 0
    default:
      return currCount
  }
}

type CounterProps = {
  initialValue1: number
  initialValue2: number
}

const Counter3 = (props: CounterProps) => {
  const { initialValue1,initialValue2  } = props
  const [ count1, dispatch ] = useReducer(reducer, initialValue1)
  const [ count2 , setCount ] = useState(initialValue2)

  return (
    <div>
      <p>Count1: {count1}</p>
      <p>Count2: {count2}</p>
      <button onClick={() => dispatch('INCREMENT')}>+</button>
      <button onClick={() => dispatch('RESET')}>RESET</button>
      <button onClick={() => setCount((prevCount) => {return prevCount - 1})}>-</button>
      <input type="text" name="atext" value=""/>
    </div>
  )
}

export default Counter3