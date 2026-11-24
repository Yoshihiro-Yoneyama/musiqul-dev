import TextArea from "@/shared/ui/molecules/input-textarea/TextArea";
import {Meta, StoryObj} from "@storybook/react";

const meta : Meta<typeof TextArea> = {
  title: 'molecules/input-textarea/TextArea',
  component: TextArea,
  tags: ['autodocs', 'component']
} satisfies Meta<typeof TextArea>

export default meta

type Story = StoryObj<typeof TextArea>

export const Default: Story = {
  args: {
    label: 'テキストエリア',
    description: 'エラーメッセージが入る予定。',
    placeholder: 'ここに文章を入力してください。',
    type: 'string',
  }
}