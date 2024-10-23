import type { StorybookConfig } from "@storybook/nextjs";
import {VanillaExtractPlugin} from "@vanilla-extract/webpack-plugin";
import {merge} from "webpack-merge";


const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  
  webpackFinal: async (config) =>
    merge(config, {
      plugins: [new VanillaExtractPlugin()]
    }),
  
  docs: {},
  
  typescript: {
    reactDocgen: "react-docgen-typescript"
  },
  
  staticDirs: ["public"],
};
export default config;
