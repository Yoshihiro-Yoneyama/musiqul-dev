'use client'

import * as styles from '@/shared/ui/atoms/date-calendar/DateCalendar.css';
import React, {FC, useState} from 'react'
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
  Heading,
  I18nProvider,
  Popover
} from 'react-aria-components'
import 'react-datepicker/dist/react-datepicker.css'
import {formatDate} from '@/shared/ui/util/DateFormatter'

export type DatePickerProps = {
  readonly name?: string
  readonly isDisabled?: boolean
  readonly onChange: (value: string) => void
}

const DateCalendar: FC<DatePickerProps> = ({
  isDisabled,
  onChange,
  ...props
}) => {
  const [inputValue, setInputValue] = useState('')
  
  const handleChange = (value: DateValue) => {
  // Do nothing if input is disabled
    if (isDisabled) return
    
    // format ot yyyy-MM-dd
    const formattedValue = formatDate(value);
    
    // Update Local State
    setInputValue(formattedValue)
    
    // Call onChange to notify the parent component
    if (onChange) onChange(formattedValue)
  }
  
  return (
    <I18nProvider
      locale={'ja-JP'}
    >
      <AriaDatePicker
        {...props}
        className={styles.datePicker}
        onChange={handleChange}
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