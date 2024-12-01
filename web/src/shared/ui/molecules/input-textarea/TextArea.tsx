"use client"

import React, {ChangeEvent, useState} from "react"
import {
  Label,
  Text,
  TextArea as AriaTextArea,
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps
} from "react-aria-components"
import {inputStyles} from "@/shared/ui/molecules/input-textarea/TextArea.css"
import {clsx} from "clsx"
import namedMemo from "@/shared/hooks/namedMemo"

export type TextBoxProps = {
  /** The label of the input */
  readonly label?: string
  /** The description of the input */
  readonly description?: string
  /** The type of the input */
  readonly type?: string
  /** The value type of the input */
  readonly valueType?: string | number | undefined
  /** The placeholder of the input */
  readonly placeholder?: string
  /** The flag to disable the input */
  readonly isDisabled?: boolean
  /** The maximum length of the input */
  readonly maxLength?: number
} & AriaTextFieldProps

const TextArea: React.FC<TextBoxProps> = ({
  label,
  description,
  isDisabled,
  ...props
}) => {
  const [inputState, setInputState] = useState({
    isFocused: false,
    isActive: false,
    inputValue: "",
  })
  
  const handleFocus = () => {
    if (!isDisabled) {
      setInputState((prevState) => ({ ...prevState, isFocused: true }));
    }
  }
  
  const handleBlur = () => {
    setInputState((prevState) => ({
      ...prevState,
      isFocused: false,
      isActive: prevState.inputValue.trim().length > 0,
    }));
  }
  
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (isDisabled) return;
    const value = event.target.value;
    setInputState((prevState) => ({ ...prevState, inputValue: value }));
    props.onChange?.(value); // 外部から渡された `onChange` を呼び出し
  }
  
  return (
    <AriaTextField>
      {label && (
        <Label slot={"label"}>
          {label}
        </Label>
      )}
      <AriaTextArea
        aria-label={label}
        className={clsx(
          inputStyles.default,
          inputState.isFocused && !isDisabled ? inputStyles.focused : "",
          inputState.isActive && !inputState.isFocused && !isDisabled
            ? inputStyles.active
            : "",
          isDisabled ? inputStyles.disabled : ""
        )}
        disabled={isDisabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        rows={10}
      />
      {description && (
        <Text slot={"description"}>
          {description}
        </Text>
      )}
    </AriaTextField>
  )
}

export default namedMemo(TextArea, "TextArea")