'use client'

import React from "react";
import * as styles from "./InputCalendar.css";
import Required from "@/shared/ui/atoms/required/Required";
import DateCalendar from "@/shared/ui/atoms/date-calendar/DateCalendar";

type calendarProps = {
  title: string,
  id: string,
  name: string,
  disabled: boolean,
  displayedRequired: boolean,
};

const InputCalendar: React.FC<calendarProps> = ({id, title, name, disabled, displayedRequired}) => {
  return (
    <div className={styles.formContainer}>
      <div className={styles.titleContainer}>
        {title}
        <Required displayed={displayedRequired}/>
      </div>
      <DateCalendar id={id} name={name} disabled={disabled}/>
    </div>
  )
};

export default InputCalendar;