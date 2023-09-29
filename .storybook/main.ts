import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/__tests__/**/*.mdx", "../src/__tests__/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-mdx-gfm"
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  core: {
    // @ts-ignore
    builder: "@storybook/builder-vite"
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
