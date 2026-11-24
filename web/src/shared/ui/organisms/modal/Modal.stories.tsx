import {Meta, StoryObj} from "@storybook/react"
import Modal from "@/shared/ui/organisms/modal/Modal"
import {useArgs} from "@storybook/core/preview-api";
import Button from "@/shared/ui/atoms/button/Button";
import Title from "@/shared/ui/atoms/title/Title";
import TextBox from "@/shared/ui/atoms/textbox/TextBox";

const meta : Meta<typeof Modal> = {
  title: 'organisms/modal/Modal',
  component: Modal,
  tags: ['autodocs', 'component'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      defaultValue: true,
    },
    onOpenChange: {
      description: 'モーダルの開閉状態が変更されたときに呼ばれるコールバック関数',
      action: 'open change',
    },
    children: {
      description: 'モーダルの中身',
    },
    dialogAriaLabel: {
      defaultValue: 'ダイアログ　aria-label属性',
    },
    isXClose: {
      control: 'boolean',
      defaultValue: false,
    },
    isDismissable: {
      control: 'boolean',
      defaultValue: false,
    },
  }
} satisfies Meta<typeof Modal>

export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
  args: {
    isOpen: true,
    dialogAriaLabel: 'テスト',
    isXClose: false,
    isDismissable: false,
  },
  render(args) {
    const { dialogAriaLabel, isXClose, isDismissable } = args
    const [{isOpen}, updateArguments] = useArgs<typeof args>()
    const setIsOpen = (_isOpen: boolean) => updateArguments({isOpen: _isOpen})
    
    return (
      <>
        <Button
          appearance="primary"
          onPress={() => setIsOpen(true)}
        >
          モーダルを表示する
        </Button>
        <Modal
          isOpen={isOpen}
          dialogAriaLabel={dialogAriaLabel}
          isXClose={isXClose}
          isDismissable={isDismissable}
          onOpenChange={setIsOpen}
        >
          <Title type='section' order={2}>
            モーダルのタイトル
          </Title>
          <TextBox>
            モーダルの中身
          </TextBox>
          <Button
            appearance="primary"
            onPress={() => setIsOpen(false)}
          >
            モーダルを閉じる
          </Button>
        </Modal>
      </>
    )
  }
}