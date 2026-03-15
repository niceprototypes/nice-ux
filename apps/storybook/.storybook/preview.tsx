import React from 'react'
import type { Preview } from '@storybook/react-vite'
import { create } from 'storybook/theming'
import { StylesProvider, getToken } from 'nice-react-styles'
import './custom.css'

const docsTheme = create({
  base: 'light',
  fontBase: getToken("fontFamily", "base").value,
  fontCode: getToken("fontFamily", "code").value,
})

const preview: Preview = {
  decorators: [
    (Story) => (
      <StylesProvider>
        <Story />
      </StylesProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: docsTheme,
    },
    options: {
      storySort: {
        order: [
          'Welcome', ['Design Tokens', 'Design Patterns', 'UI Components'],
          'Tokens', ['Browse', 'Responsive', 'Icons'],
          'React', ['Styles', ['StylesProvider', 'getToken', 'createTokens'], 'Components', 'Hooks'],
          'Configuration', ['NPM', 'Vite', 'TypeScript', 'Jest', 'Rollup']
        ],
      },
    },
  },
}

export default preview