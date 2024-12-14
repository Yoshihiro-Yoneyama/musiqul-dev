import {Meta, StoryObj} from "@storybook/react"
import Modal from "@/shared/ui/organisms/modal/Modal"

const meta : Meta<typeof Modal> = {
  title: 'organisms/modal/Modal',
  component: Modal,
  tags: ['autodocs', 'component']
} satisfies Meta<typeof Modal>

export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
  args: {
    isOpen: true,
    dialogAriaLabel: 'テスト',
    children: 'テスト',
  }
}