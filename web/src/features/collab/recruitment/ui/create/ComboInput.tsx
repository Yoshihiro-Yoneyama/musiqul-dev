'use client'

import React from "react";
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
  // フォーマットされた値を親に通知する
  const notifyChange = (stringValue: string, numberValue: number) => {
    if (stringValue && numberValue) {
      onChange(stringValue, numberValue);
    }
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
        onChange={(value) => notifyChange(value, selectedNumber)} // 楽器名変更時に通知
      />
      
      {/* 数量のSelector */}
      <Selector
        options={numberOptions}
        selectedValue={selectedNumber.toString()}
        onChange={(value) => notifyChange(selectedString, Number(value))} // 数量変更時に通知
      />
    </div>
  );
};

export default ComboInput;
