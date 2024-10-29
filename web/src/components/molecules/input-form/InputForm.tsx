import React from "react";
import Required from "@/components/atoms/required/Required";
import TextBox from "@/components/atoms/textbox/TextBox";
import * as styles from "./InputFrom.css";

type FormProps = {
  title: string
  id: string,
  name: string,
  disabled: boolean
}

const InputForm: React.FC<FormProps> = ({title, id, name, disabled}) => {
  return (
    <div className={styles.formContainer}>
      <div className={styles.titleContainer}>
        {title}
        <Required/>
      </div>
      <TextBox id={id} name={name} disabled={disabled}/>
    </div>
  )
}

export default InputForm