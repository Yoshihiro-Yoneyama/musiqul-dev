import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TextArea } from "./TextArea";

const meta = {
  title: "shared/TextArea",
  component: TextArea,
  args: { placeholder: "メモ" },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Invalid: Story = { args: { "aria-invalid": true } };
