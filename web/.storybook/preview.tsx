import type {Preview} from "@storybook/react";

import {ThemeProvider} from "@storybook/core/theming";
import {theme} from "../src/shared/themes";


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
      <ThemeProvider theme={theme}>
        <Story/>
      </ThemeProvider>
    )
  ]
};

export default preview;
