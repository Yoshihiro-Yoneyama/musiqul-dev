'use client'

import React from "react";
import * as styles from "./InputCalendar.css";
import Required from "@/shared/ui/atoms/required/Required";
import DateCalendar, {DatePickerProps} from "@/shared/ui/atoms/date-calendar/DateCalendar";

type calendarProps = {
  readonly title: string,
  readonly displayedRequired: boolean
  readonly datePickerProps: DatePickerProps,
};

const InputCalendar: React.FC<calendarProps> = ({
  title,
  displayedRequired,
  datePickerProps,
  ...props
}) => {
  return (
    <div className={styles.formContainer}>
      <div className={styles.titleContainer}>
        {title}
        <Required displayed={displayedRequired}/>
      </div>
      <DateCalendar
        isDisabled={false}
        onChange={datePickerProps.onChange}
        {...props}
      />
    </div>
  )
};

export default InputCalendar;