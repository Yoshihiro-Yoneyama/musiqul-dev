'use client'

import React, {FC, useState} from "react";
import * as styles from './Checkbox.css'
import {
  Checkbox as AriaCheckbox,
  type CheckboxProps,
} from 'react-aria-components'

type Option = {
  value: string;
  label: string;
};


type Props = {
  props: CheckboxProps,
  options: Option[],
}

const Checkbox: FC<Props> = ({...props}) => {
  return (
    <>
      {props.options.map((option) => (
        <AriaCheckbox
          className={styles.styleForBetweenLabelAndCheckbox}
          key={option.value}
          value={option.value}
        >
          {() => (
            <span className={styles.checkboxStyles}>
              {option.label}
            </span>
          )}
        </AriaCheckbox>
      ))}
    </>
    
    
    // {options.map((option) => (
    //   <label key={option.value} className={styles.styleForBetweenLabelAndCheckbox}>
    //     <input
    //       className={styles.styleForBetweenLabelAndCheckbox}
    //       id={`${id}.${option.value}`}
    //       type="checkbox"
    //       name={name}
    //       value={option.value}
    //     />
    //     {option.label}
    //   </label>
    // ))}
  
  
  );
};

export default Checkbox;