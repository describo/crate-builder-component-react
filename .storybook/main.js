module.exports = {
  "stories": ["../src/**/*.stories.tsx"],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    //"@storybook/addon-postcss",
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
    "@storybook/addon-actions",
    "@storybook/addon-data"
  ],
  docs: {
    autodocs: true
  },
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  }
};
