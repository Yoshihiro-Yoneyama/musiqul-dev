import Selector from "@/shared/ui/atoms/selector/Selector";
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof Selector> = {
  title: "atoms/selector/Selector",
  component: Selector,
  tags: ["autodocs", "component"],
} satisfies Meta<typeof Selector>

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
    selectedValue: '',
    options: options,
    defaultOptionLabel: 'Please select',
    isDisabled: false,
    onChange: () => {},
  }
}
