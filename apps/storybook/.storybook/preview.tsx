import React from 'react'
import type { Preview } from '@storybook/react'
import { create } from 'storybook/theming'
import { StylesProvider } from 'nice-react-styles'
import { getToken } from 'nice-styles'
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
        order: ['Styles', 'Components', 'Hooks'],
      },
    },
  },
}

export default preview