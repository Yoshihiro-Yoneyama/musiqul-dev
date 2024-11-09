"use client"

import {inputStyles} from "@/shared/ui/util/Input.css";
import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DatePickerProps = {
  id: string,
  name: string,
  disabled: boolean,
}

const DateCalendar: React.FC<DatePickerProps> = ({id, name, disabled}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  
  const handleFocus = () => {
    if (!disabled) {
      setIsFocused(true);
    }
  };
  
  const handleBlur = () => {
    setIsFocused(false);
    setIsActive(inputValue.trim().length > 0);
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
  
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  
  return (
    <DatePicker
      id={id}
      name={name}
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      showMonthYearDropdown={true}
      minDate={new Date("2020-01-01")}
      maxDate={new Date("2030-12-31")}
      disabled={disabled}
      className={[
        inputStyles.default,
        isFocused && !disabled ? inputStyles.focused : "",
        isActive && !isFocused && !disabled ? inputStyles.active : "",
        disabled ? inputStyles.disabled : ""
      ].join(" ")}
    />
  );
};

export default DateCalendar;
