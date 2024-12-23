import {Meta, StoryObj} from "@storybook/react";
import ModalContent from "@/shared/ui/organisms/modal/ModalContent";

const meta: Meta<typeof ModalContent> = {
  title: 'organisms/modal/ModalContent',
  component: ModalContent,
  tags: ['autodocs', 'component'],
  argTypes: {
    title: {
      description: 'モーダルのタイトル',
    },
    closeButtonLabel: {
      description: 'モーダルの閉じるボタンのラベル',
    },
    onChanged: {
      description: 'モーダルの変更ボタンのラベル',
    },
    onClose: {
      description: 'モーダルの閉じるボタンのラベル',
    },
  },
} satisfies Meta<typeof ModalContent>

export default meta

type Story = StoryObj<typeof ModalContent>

export const Default: Story = {
  args: {
    title: 'モーダルのタイトル',
    closeButtonLabel: '閉じる',
    onChanged: () => {},
    onClose: () => {},
  },
  render(args) {
    return <ModalContent {...args} />
  },
}