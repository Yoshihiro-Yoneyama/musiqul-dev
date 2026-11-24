'use client'

import React from "react";
import * as styles from "./InputCalendar.css";
import Required from "@/shared/ui/atoms/required/Required";
import {DatePickerProps} from "@/shared/ui/atoms/date-calendar/DateCalendar";
import dynamic from 'next/dynamic';

// React 19 + Next.js 15: Dynamic import to prevent SSR hydration mismatch
const DateCalendar = dynamic(
  () => import("@/shared/ui/atoms/date-calendar/DateCalendar"),
  { 
    ssr: false,
    loading: () => (
      <div className={styles.formContainer}>
        <span>読み込み中...</span>
      </div>
    )
  }
);

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
        aria-label="日付を選択してください"
        isDisabled={false}
        onChange={datePickerProps.onChange}
        {...props}
      />
    </div>
  )
};

export default InputCalendar;