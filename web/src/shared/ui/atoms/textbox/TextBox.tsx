"use client"

import React, {useState} from "react";
import {inputStyles} from "@/shared/ui/util/Input.css";

type TextBoxProps = {
  id: string,
  name: string,
  disabled: boolean,
}

const TextBox: React.FC<TextBoxProps> = ({ id, name, disabled = false }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  
  const handleFocus = () => {
    if (!disabled) {
      setIsFocused(true);
    }
  };
  
  const handleBlur = () => {
    setIsFocused(false);
    setIsActive(inputValue.trim().length > 0);
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
  
  return (
    <input
      id={id}
      name={name}
      type="text"
      value={inputValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={[
        inputStyles.default,
        isFocused && !disabled ? inputStyles.focused : "",
        isActive && !isFocused && !disabled ? inputStyles.active : "",
        disabled ? inputStyles.disabled : ""
      ].join(" ")}
      disabled={disabled}
      placeholder="test"
    />
  )
}

export default TextBox