"use client"

import {useCallback, useState} from "react";
import Button from "@/app/atomic-design/component/practice1-presentatioanal-component";

const usePopup = () => {
  const cb = useCallback((text: string) => {
    prompt(text)
  }, [])

  return cb
}

type CountButtonProps = {
  label: string
  maximum: number
}

export const CountButton = (props: CountButtonProps) => {
  const {label, maximum} = props

  const displayPopup = usePopup()

  const [count, setCount] = useState(0)

  const onClick = useCallback(() => {
    const newCount = count + 1
    setCount(newCount)

    if (newCount >= maximum) displayPopup(`You've clicked ${newCount} times`)
  }, [count, maximum])

  const disabled = count >= maximum
  const text = disabled ? `Can\'t click any more`: `You've clicked ${count} times`

  return (
    <Button label={label} text={text} disabled={disabled} onClick={onClick}/>
  )
}