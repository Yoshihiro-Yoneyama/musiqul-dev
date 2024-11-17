"use client"

import React, {ChangeEvent, useState} from "react"
import {Input as AriaInput} from "react-aria-components"
import {inputStyles} from "@/shared/ui/util/Input.css"
import {clsx} from "clsx";
import namedMemo from "@/shared/hooks/namedMemo";

export type TextBoxProps = {
  readonly name?: string
  readonly type?: string
  readonly inputValue?: string
  readonly valueType?: string | number | undefined
  readonly placeholder?: string
  // readonly errorMessages?: string
  // readonly isInvalid?: boolean
  readonly isDisabled?: boolean
  readonly onChange: (value: string) => void
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
  const [inputValue, setInputValue] = useState('')
  
  const handleFocus = () => {
    if (!isDisabled) {
      setIsFocused(true)
    }
  }
  
  const handleBlur = () => {
    setIsFocused(false)
    setIsActive(inputValue.trim().length > 0)
  }
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Do nothing if input is disabled
    if (isDisabled) return
    
    const value = event.target.value
    // Update Local State
    setInputValue(value)
    
    // Call onChange to notify the parent component
    if (onChange) onChange(value)
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
        value={inputValue}
        disabled={isDisabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        autoComplete={autoComplete}
        {...props}
      >
      </AriaInput>
    </>
  )
}

export default namedMemo(TextBox, 'TextBox')