import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

const theme = create({
  base: 'light',
  brandTitle: 'Nice Components',
  brandUrl: 'https://niceprototypes.com',
  brandImage: '/logo.svg',
  brandTarget: '_self',

  fontBase: '"Google Sans Flex", sans-serif',
  fontCode: '"Roboto Mono", "Courier New", serif',
});

addons.setConfig({
  theme,
});