import {Meta, StoryObj} from "@storybook/react";
import DateCalendar from "@/shared/ui/atoms/date-calendar/DateCalendar";

const meta : Meta<typeof DateCalendar> = {
  title: 'atoms/date-calendar/DateCalendar',
  component: DateCalendar,
  tags: ['autodocs', 'component']
} satisfies Meta<typeof DateCalendar>

export default meta

type Story = StoryObj<typeof DateCalendar>

export const Default: Story = {
  args: {
    name: "date",
  }
}