'use client'

import * as styles from "./InputSelector.css";
import React from "react";
import Required from "@/shared/ui/atoms/required/Required";
import Selector, {SelectorProps} from "@/shared/ui/atoms/selector/Selector";

type Props = {
  title: string
  displayedRequired: boolean
  selectorProps: SelectorProps
}

const InputSelector: React.FC<Props> = ({
  title,
  displayedRequired,
  selectorProps,
  ...props
}) => {
  return (
    <div className={styles.selectorContainer}>
      <div className={styles.titleContainer}>
        {title}
        <Required displayed={displayedRequired}/>
      </div>
      <Selector
        selectedValue={selectorProps.selectedValue}
        options={selectorProps.options}
        defaultOptionLabel={selectorProps.defaultOptionLabel}
        isDisabled={selectorProps.isDisabled}
        onChange={selectorProps.onChange}
        {...props}
      />
    </div>
  )
}

export default InputSelector;