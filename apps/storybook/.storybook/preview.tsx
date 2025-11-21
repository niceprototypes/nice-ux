import React from 'react'
import type { Preview } from '@storybook/react'
import { create } from 'storybook/theming'
import { StylesProvider } from 'nice-react-styles'
import { StyleConstants } from 'nice-styles'
import './custom.css'

const docsTheme = create({
  base: 'light',
  fontBase: StyleConstants.FONT_FAMILY_BASE,
  fontCode: StyleConstants.FONT_FAMILY_CODE,
})

const preview: Preview = {
  decorators: [
    (Story) => (
      <StylesProvider loadFonts>
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
  },
}

export default preview