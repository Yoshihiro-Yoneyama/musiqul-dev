'use client'

import * as styles from '@/shared/ui/atoms/date-calendar/DateCalendar.css';
import React, {useState} from 'react'
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  DateInput,
  DatePicker as AriaDatePicker,
  DateSegment,
  DateValue,
  Dialog,
  Group,
  Heading, I18nProvider,
  Label,
  Popover
} from 'react-aria-components'
import 'react-datepicker/dist/react-datepicker.css'
import {clsx} from 'clsx'
import {createCalendar} from "@internationalized/date";

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
  
  const DateFormatter = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long", // 「㎜月」にする場合: "2-digit"
    day: "2-digit"
  });
  
  return (
    <I18nProvider
      locale={'ja-JP'}
    >
      <AriaDatePicker
        {...props}
        className={styles.datePicker}
      >
        <Group className={styles.group}>
          <DateInput className={styles.dateInput}>
            {(segment) => (
              <DateSegment
                segment={segment}
                
              />
            )}
          </DateInput>
          <Button>▼</Button>
        </Group>
        <Popover className={styles.popover}>
          <Dialog>
            <Calendar className={styles.calendar}>
              <header className={styles.header}>
                <Button slot="previous">◀</Button>
                <Heading className={styles.header}/>
                <Button slot="next">▶</Button>
              </header>
              <CalendarGrid>
                {(date) => <CalendarCell date={date} />}
              </CalendarGrid>
            </Calendar>
          </Dialog>
        </Popover>
      </AriaDatePicker>
    </I18nProvider>
  )
}

export default DateCalendar