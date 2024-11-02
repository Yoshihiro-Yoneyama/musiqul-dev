import {Meta, StoryObj} from "@storybook/react";
import InputCalendar from "@/components/molecules/input-calendar/InputCalendar";
import React from "react";

const meta: Meta<typeof InputCalendar> = {
  title: "molecules/input-calendar/InputCalendar",
  component: InputCalendar,
  tags: ["autodocs", "component"],
} satisfies Meta<typeof InputCalendar>

export default meta
type Story = StoryObj<typeof meta>;

export const Story = () => {
  <div>
    <InputCalendar title={"テスト"} id={"test"} name={"test"} disabled={false}/>
  </div>
}