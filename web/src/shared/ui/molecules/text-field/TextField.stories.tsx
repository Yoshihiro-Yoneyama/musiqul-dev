import {Meta, StoryObj} from "@storybook/react";
import TextField from "@/shared/ui/molecules/text-field/TextField";

const meta: Meta<typeof TextField> = {
  title: 'atoms/text-field/TextField',
  component: TextField,
  tags: ['autodocs', 'component']
} satisfies Meta<typeof TextField>

export default meta

type Story = StoryObj<typeof TextField>

export const Default: Story = {
  args: {
    label: 'Label',
    description: 'input your name',
    orientation: 'vertical',
    name: 'name',
    type: 'text',
    placeholder: 'your name'
  }
}