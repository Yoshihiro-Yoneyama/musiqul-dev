import {Meta, StoryObj} from "@storybook/react";
import InputCalendar from "@/shared/ui/molecules/input-calendar/InputCalendar";

const meta: Meta<typeof InputCalendar> = {
  title: "molecules/input-calendar/InputCalendar",
  component: InputCalendar,
  tags: ["autodocs", "component"],
} satisfies Meta<typeof InputCalendar>

export default meta
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "テスト",
    displayedRequired: true,
    datePickerProps: {
      onChange: () => {
      },
    }
  }
}