import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Alert } from "./Alert";

const meta = {
  title: "shared/Alert",
  component: Alert,
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Error: Story = { args: { tone: "error", children: "通信に失敗しました。時間をおいて再度お試しください。" } };
export const Success: Story = { args: { tone: "success", children: "募集を作成しました。" } };
