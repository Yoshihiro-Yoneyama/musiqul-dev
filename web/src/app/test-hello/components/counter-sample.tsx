import {useState} from "react";

type CounterProps = {
  initialValue: number
}

const Counter = (props: CounterProps) => {
  const {initialValue} = props
  const [count, setCount] = useState(initialValue)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(CountMinusOne)}>-</button>
      <button onClick={() => setCount(CountPlusOne)}>+</button>
    </div>
  )
}

const CountPlusOne = (count: number) => {
  return count + 1
}

const CountMinusOne = (count: number) => {
  return count - 1
}

export default Counter