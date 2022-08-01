const path = require('path');

module.exports = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.tsx'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials',
    '@bbbtech/storybook-formik/register',
    'storybook-addon-react-router-v6'
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
  },
  async viteFinal(config) {
    // customize the Vite config here
    return {
      ...config,
      resolve: {
        alias: [
          {
            find: 'ui',
            replacement: path.resolve(
              __dirname,
              '../../../packages/ui/'
            ),
          },
        ],
      },
    };
  },
};
