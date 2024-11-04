'use client'

import {inputStyles} from "@/components/util/Input.css";
import React, {useState} from "react";
import * as styles from './Checkbox.css'

type Option = {
  value: string;
  label: string;
};

type CheckboxProps = {
  id: string,
  title: string,
  name: string,
  options: Option[],
};

const Checkbox = ({id, title, name, options}: CheckboxProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  
  const handleBlur = () => {
    setIsFocused(false);
    setIsActive(inputValue.trim().length > 0)
  }
  return (
    <div id={id}>
      {title}
      {options.map((option) => (
        <label key={option.value} className={styles.styleForBetweenLabelAndCheckbox}>
          <input
            className={styles.styleForBetweenLabelAndCheckbox}
            id={`${id}.${option.value}`}
            type="checkbox"
            name={name}
            value={option.value}
            onBlur={handleBlur}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default Checkbox;