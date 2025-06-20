'use client'

import * as styles from '@/shared/ui/atoms/date-calendar/DateCalendar.css';
import React, {FC, useState, useEffect} from 'react'
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
import {formatDateToISO} from '@/shared/ui/util/DateFormatter'

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
  const [isClient, setIsClient] = useState(false)
  
  // React 19: Ensure client-side only rendering to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  const handleChange = (value: DateValue | null) => {
    // If the date picker is disabled or the value is empty, return
    if (isDisabled || !value) return;
    
    // Update the date by formatting
    const formattedValue = formatDateToISO(value);
    
    // Update the local state
    setInputValue(formattedValue);
    
    // Notify the parent component
    onChange(formattedValue);
  };
  
  // Prevent SSR hydration mismatch by rendering placeholder until client loads
  if (!isClient) {
    return (
      <div className={styles.datePicker}>
        <div className={styles.group}>
          <div className={styles.dateInput}>
            <span>日付を選択してください</span>
          </div>
          <button disabled>▼</button>
        </div>
      </div>
    )
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
                {(date) => <CalendarCell date={date}/>}
              </CalendarGrid>
            </Calendar>
          </Dialog>
        </Popover>
      </AriaDatePicker>
    </I18nProvider>
  )
}

export default DateCalendar