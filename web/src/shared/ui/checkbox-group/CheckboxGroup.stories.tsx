import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CheckboxGroup } from "./CheckboxGroup";

const meta = {
  title: "shared/CheckboxGroup",
  component: CheckboxGroup,
  args: {
    name: "genres",
    legend: "ジャンル",
    options: [
      { value: "ROCK", label: "ロック" },
      { value: "JAZZ", label: "ジャズ" },
      { value: "OTHER", label: "その他" },
    ],
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultValues: ["JAZZ"] } };
export const WithError: Story = { args: { required: true, error: "1 つ以上選択してください" } };
