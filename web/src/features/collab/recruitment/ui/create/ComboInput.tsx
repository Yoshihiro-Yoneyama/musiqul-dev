'use client'

import React, {useState} from "react";
import Selector from "@/shared/ui/atoms/selector/Selector";
import Required from "@/shared/ui/atoms/required/Required";
import * as styles from "./ComboInput.css";

type Option = {
  readonly value: string;
  readonly label: string;
};

type ComboInputProps = {
  readonly title: string;
  readonly defaultStringOption: string;
  readonly stringOptions: Option[];
  readonly numberOptions: Option[];
  readonly onChange: (stringValue: string, numberValue: number) => void; // 親に通知する関数
  readonly selectedString: string; // 現在の楽器
  readonly selectedNumber: number; // 現在の数量
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
      {/* 楽器名のSelector */}
      <Selector
        options={stringOptions}
        defaultOptionLabel={defaultStringOption}
        selectedValue={selectedString}
        onChange={handleStringChange} // 楽器名変更時に通知
      />
      
      {/* 数量のSelector */}
      <Selector
        options={numberOptions}
        selectedValue={selectedNumber.toString()}
        onChange={handleNumberChange} // 数量変更時に通知
      />
    </div>
  );
};

export default ComboInput;
