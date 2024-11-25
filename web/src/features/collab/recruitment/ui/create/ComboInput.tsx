'use client'

import React, {useState} from "react";
import Selector from "@/shared/ui/atoms/selector/Selector";

type Option = {
  value: string;
  label: string;
};

type ComboInputProps = {
  id: string,
  name: string,
  defaultOptionLabel1: string,
  defaultOptionLabel2: number,
  options1: Option[],
  options2: Option[],
  disabled: boolean,
}

const ComboInput: React.FC<ComboInputProps> = ({
  id,
  name,
  defaultOptionLabel1,
  defaultOptionLabel2,
  options1,
  options2,
  disabled
}) => {
  
  // State to manage the selected values for both selectors
  const [selectedValues, setSelectedValues] = useState(new Map([]));
  
  const handleChange = (selector: "selector1" | "selector2") => (value: string) => {
    setSelectedValues(prevValues => ({
      ...prevValues,
      [selector]: value,
    }));
  };
  
  return (
    <div id={id} aria-label={name}>
      <Selector
        selectedValue={selectedValues.values().next().value}
        options={options1}
        defaultOptionLabel={defaultOptionLabel1}
        isDisabled={disabled}
        onChange={handleChange("selector1")}
      
      />
      <Selector
        selectedValue={selectedValues.values().next().value}
        options={options2}
        defaultOptionLabel={defaultOptionLabel2}
        isDisabled={disabled}
        onChange={handleChange("selector2")}
      />
    </div>
  );
}

export default ComboInput;
