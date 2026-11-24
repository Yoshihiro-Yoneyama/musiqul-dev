'use client'

import React from "react";
import Required from "@/shared/ui/atoms/required/Required";
import TextBox, {TextBoxProps} from "@/shared/ui/atoms/textbox/TextBox";
import * as styles from "./InputForm.css";
import {AriaTextFieldProps} from "react-aria";


type Props = {
  readonly label?: string
  readonly displayedRequired: boolean
  textBoxProps: TextBoxProps
} & AriaTextFieldProps

const InputForm: React.FC<Props> = ({
  label,
  displayedRequired,
  textBoxProps,
  ...props
}) => {
  return (
    <div className={styles.formContainer}>
      <div className={styles.titleContainer}>
        {label}
        <Required displayed={displayedRequired}/>
      </div>
      <TextBox
        isDisabled={textBoxProps.isDisabled}
        onChange={textBoxProps.onChange}
        {...props}
      />
    </div>
  )
}

export default InputForm