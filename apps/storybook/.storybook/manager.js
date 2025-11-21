import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';
import { StyleConstants } from 'nice-styles';

const theme = create({
  base: 'light',
  brandTitle: 'Nice Components',
  brandUrl: 'https://niceprototypes.com',
  brandImage: '/logo.svg',
  brandTarget: '_self',

  fontBase: StyleConstants.FONT_FAMILY_BASE,
  fontCode: StyleConstants.FONT_FAMILY_CODE,
});

addons.setConfig({
  theme,
});