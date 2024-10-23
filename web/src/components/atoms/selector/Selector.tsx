"use client"

import React, {useState} from "react";
import {selectorStyles} from "@/components/atoms/selector/Selector.css";

type Option = {
  value: string;
  label: string;
};

type SelectorProps = {
  name: string;
  options: Option[]; // Option型の配列を渡す
  onChange: (value: string) => void; // 選択された要素のコールバック
  value: string; // 現在選択されている値
  disabled?: boolean; // オプショナルなdisabledプロパティ
};

const SelectComponent = ({
                                                      name,
                                                      options,
                                                      onChange,
                                                      value,
                                                      disabled, // disabledのデフォルト値をfalseに設定
                                                    }: SelectorProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  
  const handleFocus = () => {
    if (!disabled) {
      setIsFocused(true)
    }
  };
  
  const handleBlur = () => {
    setIsFocused(false);
    setIsActive(inputValue.trim().length > 0)
  }
  
  return (
    <select
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value as string)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={[
        selectorStyles.default,
        isFocused && !disabled ? selectorStyles.focused : "",
        isActive && !isFocused && !disabled ? selectorStyles.active : "",
        disabled ? selectorStyles.disabled : ""
      ].join(" ")}
      disabled={disabled}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectComponent;