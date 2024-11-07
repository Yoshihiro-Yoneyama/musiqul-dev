'use client'

import React, { useState } from "react";
import Selector from "@/components/atoms/selector/Selector";

type Option = {
  value: string;
  label: string;
};

type ComboInputProps = {
  id: string,
  name: string,
  options: Option[],
  disabled: boolean,
}

const ComboInput: React.FC<ComboInputProps> = ({ id, name, options, disabled }) => {
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
        name={`${name}-1`}
        options={options}
        onChange={handleChange("selector1")}
        selectedValue={selectedValues.selector1}
        disabled={disabled}
      />
      <Selector
        name={`${name}-2`}
        options={options}
        onChange={handleChange("selector2")}
        selectedValue={selectedValues.selector2}
        disabled={disabled}
      />
    </div>
  );
}

export default ComboInput;
