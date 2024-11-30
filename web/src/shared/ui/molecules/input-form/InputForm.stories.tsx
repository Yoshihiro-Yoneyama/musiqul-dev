import {Meta, StoryObj} from "@storybook/react";
import InputForm from "@/shared/ui/molecules/input-form/InputForm";

const meta : Meta<typeof InputForm> = {
  title: 'molecules/input-form/InputForm',
  component: InputForm,
  tags: ['autodocs', 'component']
} satisfies Meta<typeof InputForm>

export default meta

type Story = StoryObj<typeof InputForm>

export const Default: Story = {
  args: {
    title: 'タイトル',
    displayedRequired: true,
    textBoxProps: {
      placeholder: 'ここに文章を入力してください。',
      onChange: () => {},
    }
  }
}