import {Meta, StoryObj} from "@storybook/react";
import ErrorMessage from "@/shared/ui/atoms/error-message/ErrorMessage";

const meta : Meta<typeof ErrorMessage> = {
  title: 'atoms/error-message/ErrorMessage',
  component: ErrorMessage,
  tags: ['autodocs', 'component']
} satisfies Meta<typeof ErrorMessage>

export default meta

type Story = StoryObj<typeof ErrorMessage>

export const Default: Story = {
  args: {
    message: "エラーメッセージが表示されます。",
  }
}