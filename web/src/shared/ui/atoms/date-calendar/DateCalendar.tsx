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
  Dialog,
  Group,
  Heading,
  I18nProvider,
  Popover
} from 'react-aria-components'
import 'react-datepicker/dist/react-datepicker.css'

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