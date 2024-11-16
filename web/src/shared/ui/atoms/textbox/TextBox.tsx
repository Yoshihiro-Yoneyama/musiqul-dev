"use client"

import React, {ChangeEvent, useState} from "react"
import {Input as AriaInput} from "react-aria-components"
import {inputStyles} from "@/shared/ui/util/Input.css"
import {clsx} from "clsx";
import namedMemo from "@/shared/hooks/namedMemo";

export type TextBoxProps = {
  readonly name?: string
  readonly type?: string
  readonly valueType?: string | number | undefined
  readonly placeholder?: string
  // readonly errorMessages?: string
  // readonly isInvalid?: boolean
  readonly isDisabled?: boolean
  readonly onChange?: (value: ChangeEvent<HTMLInputElement>) => void
  readonly autoComplete?: string
  // readonly maxLength?: number
}

const TextBox: React.FC<TextBoxProps> = ({
  isDisabled,
  onChange,
  autoComplete,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [inputValue, setInputValue] = useState("")
  
  const handleFocus = () => {
    if (!isDisabled) {
      setIsFocused(true)
    }
  }
  
  const handleBlur = () => {
    setIsFocused(false)
    setIsActive(inputValue.trim().length > 0)
  }
  
  return (
    <>
      <AriaInput
        className={clsx(
          inputStyles.default,
          isFocused && !isDisabled ? inputStyles.focused : "",
          isActive && !isFocused && !isDisabled ? inputStyles.active : "",
          isDisabled ? inputStyles.disabled : ""
        )}
        {...props}
        disabled={isDisabled}
        onChange={(event) => {
          if (!onChange) return
          onChange(event)
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoComplete={autoComplete}
      >
      </AriaInput>
    </>
  )
}

export default namedMemo(TextBox, 'TextBox')