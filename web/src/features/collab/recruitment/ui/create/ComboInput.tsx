'use client'

import React, {useState} from "react";
import Selector from "@/shared/ui/atoms/selector/Selector";
import Required from "@/shared/ui/atoms/required/Required";
import * as styles from "./ComboInput.css";

type Option = {
  readonly value: string;
  readonly label: string;
};

type SelectionState = {
  readonly stringValue: string; // String型の選択肢
  readonly numberValue: number; // Number型の選択肢
};

type ComboInputProps = {
  readonly title: string,
  readonly defaultStringOption: string,
  readonly stringOptions: Option[],
  readonly numberOptions: Option[],
  // readonly onChange: (value: string) => void
}

const ComboInput: React.FC<ComboInputProps> = ({
  title,
  defaultStringOption,
  stringOptions,
  numberOptions,
}) => {
  
  // State to manage the selected values for both selectors
  // 状態を管理（型を厳密に指定）
  const [selections, setSelections] = useState<SelectionState>({
    stringValue: '', // 初期値
    numberValue: 0,  // 初期値
  });
  
  // 選択状態を更新する関数
  const handleSelectionChange = (key: keyof SelectionState, value: string) => {
    setSelections((prev) => ({
      ...prev,
      [key]: key === 'numberValue' ? Number(value) : value, // 必要に応じて型変換
    }));
  };
  
  return (
    <div className={styles.inputContainer}>
      <div className={styles.titleContainer}>
        {title}
        <Required displayed={false}/>
      </div>
      {/* String Selector */}
      <Selector
        options={stringOptions}
        defaultOptionLabel={defaultStringOption}
        selectedValue={selections.stringValue}
        onChange={(value) => handleSelectionChange('stringValue', value)}
      />
      
      {/* Number Selector */}
      <Selector
        options={numberOptions}
        selectedValue={selections.numberValue.toString()}
        onChange={(value) => handleSelectionChange('numberValue', value)}
      />
    </div>
  );
}

export default ComboInput;
