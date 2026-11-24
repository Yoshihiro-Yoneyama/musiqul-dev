import Required from "@/shared/ui/atoms/required/Required";
import {Meta, StoryObj} from "@storybook/nextjs-vite";

const meta: Meta<typeof Required> = {
  title: "atoms/required/Required",
  component: Required,
  tags: ["autodocs", "component"],
} satisfies Meta<typeof Required>

export default meta
type Story = StoryObj<typeof meta>;

export const Story = () => (
  <div>
    <Required displayed={true}/>
  </div>
)
