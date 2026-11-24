'use client'

import {Meta, StoryObj} from "@storybook/react";
import InputSelector from "@/shared/ui/molecules/input-selector/InputSelector";

const meta: Meta<typeof InputSelector> = {
  title: "molecules/input-selector/InputSelector",
  component: InputSelector,
  tags: ["autodocs", "component"],
} satisfies Meta<typeof InputSelector>

export default meta

type Story = StoryObj<typeof meta>;

type Option = {
  value: string;
  label: string;
}

const options: Option[] = [
  {value: 'selectedValue1', label: 'selected value1'},
  {value: 'selectedValue2', label: 'selected value2'},
  {value: 'selectedValue3', label: 'selected value3'},
];

export const Default: Story = {
  args: {
    title: "selected value",
    displayedRequired: false,
    selectorProps: {
      selectedValue: '',
      options: options,
      defaultOptionLabel: 'Please select',
      isDisabled: false,
      onChange: () => {},
    },
  }
}