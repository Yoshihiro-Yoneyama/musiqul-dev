import Selector from "@/components/atoms/selector/Selector";
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof Selector> = {
  title: "atoms/selector/Selector",
  component: Selector,
  tags: ["autodocs", "component"],
} satisfies Meta<typeof Selector>

export default meta

type Story = StoryObj<typeof meta>;

type Option = {
  value: string;
  label: string;
}

const options: Option[] = [
  {value: '', label: ''},
  {value: 'Rock', label: 'ロック'},
  {value: 'Jazz', label: 'ジャズ'},
  {value: 'Pop', label: 'ポップ'},
];

export const Story = () => (
  <div>
    <Selector name={"test"} onChange={() => {
    }} selectedValue={""} options={options} disabled={false}/>
  </div>
)
