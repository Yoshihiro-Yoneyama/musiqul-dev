import type {Preview} from "@storybook/nextjs";


const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <Story/>
    )
  ]
};

export default preview;
