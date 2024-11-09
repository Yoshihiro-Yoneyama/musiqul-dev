'use client'

import {Meta, StoryObj} from "@storybook/react";
import InputSelector from "@/shared/ui/molecules/input-selector/InputSelector";
import React from "react";

const meta: Meta<typeof InputSelector> = {
  title: "molecules/input-selector/InputSelector",
  component: InputSelector,
  tags: ["autodocs", "component"],
} satisfies Meta<typeof InputSelector>

export default meta
type Story = StoryObj<typeof meta>;

type Option = {
  value: string;
  label: string;
}

const options: Option[] = [
  {value: '', label: ''},
  {value: 'test1', label: 'テスト1'},
  {value: 'test2', label: 'テスト2'},
  {value: 'test3', label: 'テスト3'},
];

export const Story = () => {
  <div>
    <InputSelector
      name={"test"}
      title={"テスト"}
      selectedValue={""}
      options={options}
      onChange={() => {}}
      disabled={false}
    />
  </div>
}