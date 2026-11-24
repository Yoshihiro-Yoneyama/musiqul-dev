import type { StorybookConfig } from "@storybook/nextjs-vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { fileURLToPath } from "node:url";
import { mergeConfig } from "vite";

// vanilla-extract は .css.ts を別の Vite コンパイラで評価するため、
// tsconfig の paths（@/*）を Vite の alias としても明示する
const srcDir = fileURLToPath(new URL("../src/", import.meta.url));


const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@chromatic-com/storybook",
    "@storybook/addon-docs"
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },

  viteFinal: async (config) =>
    mergeConfig(config, {
      resolve: {
        alias: [{ find: /^@\//, replacement: srcDir }],
      },
      plugins: [vanillaExtractPlugin()],
    }),

  docs: {},

  typescript: {
    reactDocgen: "react-docgen-typescript"
  },
};
export default config;
