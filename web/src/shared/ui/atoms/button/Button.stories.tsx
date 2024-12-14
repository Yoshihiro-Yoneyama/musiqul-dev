import {Meta, StoryObj} from "@storybook/react";
import Button from "@/shared/ui/atoms/button/Button";

const meta : Meta<typeof Button> = {
  title: 'atoms/button/Button',
  component: Button,
  tags: ['autodocs', 'component'],
  argTypes: {
    appearance: {
      description: 'The appearance of the button',
    },
  }
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    type: "button",
    appearance: "primary",
    isDisabled: false,
  }
}