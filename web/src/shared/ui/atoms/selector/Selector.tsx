'use client'

import React, {ChangeEvent, FC, useState} from 'react'
import {selectorStyles} from '@/shared/ui/atoms/selector/Selector.css'
import {clsx} from "clsx";

/** The option's type of the selector */
type Option = {
  readonly value: string
  readonly label: string
}

/** The props of the selector component */
export type SelectorProps = {
  /** The selected value of the component */
  readonly selectedValue?: string
  /** The options of the selector */
  readonly options: Option[]
  /** The default option label of the selector */
  readonly defaultOptionLabel?: any
  /** The flag to disable the selector */
  readonly isDisabled?: boolean
  /** The callback function when the selector is changed */
  readonly onChange: (value: string) => void
}

const Selector: FC<SelectorProps> = ({
  selectedValue: propSelectedValue,
  options,
  defaultOptionLabel,
  isDisabled,
  onChange
}) => {
  const [selectedValue, setSelectedValue] = useState(propSelectedValue || '')
  const [isFocused, setIsFocused] = useState(false)
  const [isActive, setIsActive] = useState(false)
  
  const handleFocus = () => {
    if (!isDisabled) setIsFocused(true)
  }
  const handleBlur = () => {
    setIsFocused(false)
    setIsActive(selectedValue.trim().length > 0)
  }
  
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value
    setSelectedValue(selectedId)
    if (onChange) onChange(selectedId)
    
    // TODO When the selected value is empty, the validation error messages should be displayed
  }
  
  return (
    <>
      <select
        className={clsx(
          selectorStyles.default,
          isFocused && !isDisabled ? selectorStyles.focused : '',
          isActive && !isFocused && !isDisabled ? selectorStyles.active : '',
          isDisabled ? selectorStyles.disabled : ''
        )}
        value={selectedValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={isDisabled}
      >
        {/* 以下はdefaultOptionLabelが存在するときのみ表示する */}
        <option value="">{defaultOptionLabel}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  )
}

export default Selector