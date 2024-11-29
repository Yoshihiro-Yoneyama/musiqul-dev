'use client'

import React, {useState} from "react";
import Selector from "@/shared/ui/atoms/selector/Selector";
import Required from "@/shared/ui/atoms/required/Required";
import * as styles from "./ComboInput.css";

type Option = {
  /** valueString */
  readonly value: string
  /** labelString */
  readonly label: string
};

/** Properties of Combo Input */
type ComboInputProps = {
  /** component title */
  readonly title: string
  /** default string option */
  readonly defaultStringOption: string
  /** string options */
  readonly stringOptions: Option[]
  /** number options */
  readonly numberOptions: Option[]
  /** callback function */
  readonly onChange: (stringValue: string, numberValue: number) => void
  /** selected string */
  readonly selectedString: string
  /** selected number */
  readonly selectedNumber: number
};

const ComboInput: React.FC<ComboInputProps> = ({
  title,
  defaultStringOption,
  stringOptions,
  numberOptions,
  onChange,
  selectedString,
  selectedNumber,
}) => {
  // ローカル状態を使って値を管理
  const [localString, setLocalString] = useState(selectedString);
  const [localNumber, setLocalNumber] = useState(selectedNumber);
  
  // フォーマットされた値を親に通知する
  const notifyChange = (stringValue: string, numberValue: number) => {
    console.log(stringValue, numberValue);
    if (stringValue && numberValue) {
      onChange(stringValue, numberValue);
    }
  };
  
  const handleStringChange = (value: string) => {
    setLocalString(value); // 楽器名を更新
    notifyChange(value, localNumber); // 現在の数量を使って通知
  };
  
  const handleNumberChange = (value: string) => {
    const numericValue = Number(value);
    setLocalNumber(numericValue); // 数量を更新
    notifyChange(localString, numericValue); // 現在の楽器名を使って通知
  };
  
  return (
    <div className={styles.inputContainer}>
      <div className={styles.titleContainer}>
        {title}
        <Required displayed={false} />
      </div>
      <Selector
        options={stringOptions}
        defaultOptionLabel={defaultStringOption}
        selectedValue={selectedString}
        onChange={handleStringChange}
      />
      
      <Selector
        options={numberOptions}
        selectedValue={selectedNumber.toString()}
        onChange={handleNumberChange}
      />
    </div>
  )
}

export default ComboInput;
