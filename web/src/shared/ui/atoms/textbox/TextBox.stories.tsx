import {Meta, StoryObj} from "@storybook/react";
import TextBox from "@/shared/ui/atoms/textbox/TextBox";

const meta : Meta<typeof TextBox> = {
  title: 'atoms/textbox/TextBox',
  component: TextBox,
  tags: ['autodocs', 'component']
} satisfies Meta<typeof TextBox>

export default meta

type Story = StoryObj<typeof TextBox>

export const Default: Story = {
  args: {
    name: 'textbox',
    valueType: 'text',
    placeholder: 'ここに文章を入力してください。',
    
  }
}