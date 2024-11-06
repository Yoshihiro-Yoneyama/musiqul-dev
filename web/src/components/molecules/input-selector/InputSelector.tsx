'use client'

import * as styles from "./InputSelector.css";
import React from "react";
import Required from "@/components/atoms/required/Required";
import Selector from "@/components/atoms/selector/Selector";

type Option = {
  value: string;
  label: string;
};

type selectorProps = {
  title: string,
  name: string,
  options: Option[],
  onChange: (value: string) => void;
  selectedValue: string,
  disabled: boolean,
  displayedRequired: boolean,
}

const InputSelector: React.FC<selectorProps> = ({title, name, options, onChange, selectedValue, disabled, displayedRequired}) => {
  return (
    <div className={styles.selectorContainer}>
      <div className={styles.titleContainer}>
        {title}
        <Required displayed={displayedRequired}/>
      </div>
      <Selector
        name={name}
        options={options}
        onChange={onChange}
        selectedValue={selectedValue}
        disabled={disabled}/>
    </div>
  )
}

export default InputSelector;