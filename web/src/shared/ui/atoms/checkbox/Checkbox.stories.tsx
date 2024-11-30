import {Meta, StoryObj} from "@storybook/react";
import Checkbox from "@/shared/ui/atoms/checkbox/Checkbox";

const meta : Meta<typeof Checkbox> = {
  title: 'atoms/checkbox/Checkbox',
  component: Checkbox,
  tags: ['autodocs', 'component']
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {
    options: [
      {
        value: "1",
        label: "option1",
      },
      {
        value: "2",
        label: "option2",
      },
      {
        value: "3",
        label: "option3",
      }
    ],
    selectedValues: ["1"],
  }
}