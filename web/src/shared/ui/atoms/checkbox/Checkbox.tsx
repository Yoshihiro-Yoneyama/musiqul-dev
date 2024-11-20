'use client'

import React, {FC, useState} from "react";
import * as styles from './Checkbox.css'
import {
  Checkbox as AriaCheckbox,
  type CheckboxProps,
} from 'react-aria-components'
import Icon from "@/shared/ui/atoms/icon/Icon";

type Option = {
  value: string;
  label: string;
};

type Props = {
  props: CheckboxProps;
  options: Option[]; // チェックボックスの選択肢
  selectedValues: string[]; // 選択状態（親から受け取る）
  onChange: (selectedValues: string[]) => void; // 状態変更のコールバック
};

/**
 * Checkbox component
 * This component supports multiple selection.
 *
 * @param props CheckboxProps of react-aria-components
 * @param options Options of the checkbox
 * @param selectedValues Selected values of the checkbox
 * @param onChange Callback function when the checkbox is changed
 */
const Checkbox: FC<Props> = ({ props, options, selectedValues, onChange }) => {
  const toggleSelection = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onChange(newSelectedValues);
  };
  
  return (
    <>
      {options.map((option) => {
        const isSelected = selectedValues.includes(option.value);
        
        return (
          <AriaCheckbox
            className={styles.styleForBetweenLabelAndCheckbox}
            key={option.value}
            isSelected={isSelected}
            onChange={() => toggleSelection(option.value)}
          >
            {({ isIndeterminate }) => (
              <span className={styles.checkboxStyles}>
                {option.label}
                {isIndeterminate ? (
                  '' // 中間状態がある場合の処理
                ) : isSelected ? (
                  <Icon type="squareCheck" /> // チェック状態のアイコン
                ) : (
                  <Icon type="square" /> // 未チェック状態のアイコン
                )}
              </span>
            )}
          </AriaCheckbox>
        );
      })}
    </>
  );
};

export default Checkbox;