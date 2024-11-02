'use client'

import React from "react";
import * as styles from "./InputCalendar.css";
import Required from "@/components/atoms/required/Required";
import DateCalendar from "@/components/atoms/date-calendar/DateCalendar";

type calendarProps = {
  title: string,
  id: string,
  name: string,
  disabled: boolean,
};

const InputCalendar: React.FC<calendarProps> = ({id, title, name, disabled}) => {
  return (
    <div className={styles.formContainer}>
      <div className={styles.titleContainer}>
        {title}
        <Required/>
      </div>
      <DateCalendar id={id} name={name} disabled={disabled}/>
    </div>
  )
};

export default InputCalendar;