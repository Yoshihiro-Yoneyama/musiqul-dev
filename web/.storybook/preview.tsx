import type { Preview } from "@storybook/nextjs-vite";
// アプリと同じテーマとグローバルスタイルを適用する
import "../src/app/styles";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
