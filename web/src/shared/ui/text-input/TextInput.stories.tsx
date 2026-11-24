import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Field } from "../field";
import { TextInput } from "./TextInput";

const meta = {
  title: "shared/TextInput",
  component: TextInput,
  args: { placeholder: "入力してください" },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithField: Story = {
  render: (args) => (
    <Field label="募集名" required hint="100 文字以内" error="募集名を入力してください">
      {(control) => <TextInput {...args} {...control} />}
    </Field>
  ),
};
