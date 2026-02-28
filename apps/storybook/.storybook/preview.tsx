import React from 'react'
import type { Preview } from '@storybook/react'
import { create } from 'storybook/theming'
import { StylesProvider } from 'nice-react-styles'
import { getCoreToken } from 'nice-styles'
import './custom.css'

const docsTheme = create({
  base: 'light',
  fontBase: getCoreToken("fontFamily", "base").value,
  fontCode: getCoreToken("fontFamily", "code").value,
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
          'Welcome',
          'Styles', ['Tokens', ['getToken', 'createTokens'], 'Icons', 'Provider'],
          'Components',
          'Hooks',
          'Configuration', ['NpmLink', 'ViteSymlinkWatcher', 'Rollup', 'TypeScript', 'Jest']
        ],
      },
    },
  },
}

export default preview