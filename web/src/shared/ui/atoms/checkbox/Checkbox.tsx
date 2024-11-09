'use client'

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
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default Checkbox;