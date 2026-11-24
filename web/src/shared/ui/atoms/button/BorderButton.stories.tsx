import {Meta, StoryObj} from '@storybook/react';
import BorderButton from '@/shared/ui/atoms/button/BorderButton';

const meta : Meta<typeof BorderButton> = {
  title: 'atoms/button/BorderButton',
  component: BorderButton,
  tags: ['autodocs', 'component'],
  argTypes: {
    appearance: {
      description: 'The appearance of the button',
    },
  }
} satisfies Meta<typeof BorderButton>

export default meta

type Story = StoryObj<typeof BorderButton>

export const Default: Story = {
  args: {
    appearance: 'primary',
    isDisabled: false,
    type: 'button',
    
  }
}