import React from "react";
import Required from "@/shared/ui/atoms/required/Required";
import TextBox from "@/shared/ui/atoms/textbox/TextBox";
import * as styles from "./InputForm.css";

//　入力フォーム

type FormProps = {
  title: string
  id: string,
  name: string,
  disabled: boolean,
  displayedRequired: boolean,
}

const InputForm: React.FC<FormProps> = ({title, id, name, disabled, displayedRequired}) => {
  return (
    <div className={styles.formContainer}>
      <div className={styles.titleContainer}>
        {title}
        <Required displayed={displayedRequired}/>
      </div>
      <TextBox id={id} name={name} disabled={disabled}/>
    </div>
  )
}

export default InputForm