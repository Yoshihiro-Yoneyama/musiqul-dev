'use client'

import * as styles from '@/shared/ui/atoms/date-calendar/DateCalendar.css';
import {inputStyles} from '@/shared/ui/util/Input.css'
import React, {ChangeEvent, useState} from 'react'
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  DateInput,
  DatePicker as AriaDatePicker,
  DateSegment, DateValue,
  Dialog,
  Group,
  Heading,
  Label,
  Popover
} from 'react-aria-components'
import 'react-datepicker/dist/react-datepicker.css'
import {clsx} from 'clsx'

export type DatePickerProps = {
  readonly name?: string
  readonly isDisabled?: boolean
  readonly onChange: (value: string) => void
}

const DateCalendar: React.FC<DatePickerProps> = ({
  isDisabled,
  onChange,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [inputValue, setInputValue] = useState('')
  
  const handleFocus = () => {
    if (!isDisabled) {
      setIsFocused(true)
    }
  }
  
  const handleBlur = () => {
    setIsFocused(false)
    setIsActive(inputValue.trim().length > 0)
  }
  
  const handleChange = (value: DateValue) => {
  // Do nothing if input is disabled
    if (isDisabled) return
    
    const stringValue = value.toString()
    // Update Local State
    setInputValue(stringValue)
    
    // Call onChange to notify the parent component
    if (onChange) onChange(stringValue)
  }
  
  return (
    <>
      <AriaDatePicker
        className={clsx(
          inputStyles.default,
          isFocused && !isDisabled ? inputStyles.focused : '',
          isActive && !isFocused && !isDisabled ? inputStyles.active : '',
          isDisabled ? inputStyles.disabled : '',
          styles.datePicker
        )}
        isDisabled={isDisabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        {...props}
      >
        <Label>Date</Label>
        <Group className={styles.group}>
          <DateInput className={styles.dateInput}>
            {(segment) => <DateSegment segment={segment}/>}
          </DateInput>
          <Button className={styles.button}>▼</Button>
        </Group>
        <Popover className={styles.popover}>
          <Dialog>
            <Calendar>
              <header>
                <Button slot='previous' className={styles.button}>◀</Button>
                <Heading/>
                <Button slot='next' className={styles.button}>▶</Button>
              </header>
              <CalendarGrid>
                {(date) => <CalendarCell date={date}/>}
              </CalendarGrid>
            </Calendar>
          </Dialog>
        </Popover>
      
      </AriaDatePicker>
    </>
  )
}

export default DateCalendar



{/*<DatePicker*/}
{/*  id={id}*/}
{/*  name={name}*/}
{/*  selected={startDate}*/}
{/*  onChange={(date: Date | null) => setStartDate(date)}*/}
{/*  onFocus={handleFocus}*/}
{/*  onBlur={handleBlur}*/}
{/*  showMonthYearDropdown={true}*/}
{/*  minDate={new Date('2020-01-01')}*/}
{/*  maxDate={new Date('2030-12-31')}*/}
{/*  disabled={disabled}*/}
{/*  className={[*/}
{/*    inputStyles.default,*/}
{/*    isFocused && !disabled ? inputStyles.focused : '',*/}
{/*    isActive && !isFocused && !disabled ? inputStyles.active : '',*/}
{/*    disabled ? inputStyles.disabled : ''*/}
{/*  ].join(' ')}*/}
{/*/>*/}
