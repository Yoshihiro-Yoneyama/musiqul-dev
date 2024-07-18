import {useState} from "react";

type CounterProps = {
  initialValue: number,
  dummy: string
}

const Counter = (props: CounterProps) => {
  const { initialValue, dummy} = props
  const [count, setCount] = useState(initialValue)

  return (
    <div>
      <p>{dummy}: {count}</p>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>+</button>
    </div>
  )
}

export default Counter