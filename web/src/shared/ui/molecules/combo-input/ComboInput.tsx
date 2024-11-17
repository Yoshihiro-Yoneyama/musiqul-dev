'use client'

import React, { useState } from "react";
import Selector from "@/shared/ui/atoms/selector/Selector";

type Option = {
  value: string;
  label: string;
};

type ComboInputProps = {
  id: string,
  name: string,
  options1: Option[],
  options2: Option[],
  disabled: boolean,
}

const ComboInput: React.FC<ComboInputProps> = ({ id, name, options1, options2, disabled }) => {
  // State to manage the selected values for both selectors
  const [selectedValues, setSelectedValues] = useState<{ selector1: string; selector2: string }>({
    selector1: "",
    selector2: "",
  });
  
  const handleChange = (selector: "selector1" | "selector2") => (value: string) => {
    setSelectedValues(prevValues => ({
      ...prevValues,
      [selector]: value,
    }));
  };
  
  return (
    <div id={id} aria-label={name}>
      <Selector
        selectedValue={selectedValues.selector1}
        options={options1}
        defaultOptionLabel='Please select'
        isDisabled={disabled}
        onChange={handleChange("selector1")}
        
      />
      <Selector
        selectedValue={selectedValues.selector1}
        options={options1}
        defaultOptionLabel='Please select'
        isDisabled={disabled}
        onChange={handleChange("selector2")}
      />
    </div>
  );
}

export default ComboInput;
