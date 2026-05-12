import React from "react"
import type { Preview } from "@storybook/react-vite"
import { create } from "storybook/theming"
import { StylesProvider, getReactToken } from "nice-react-styles"
import "nice-react-icon-vendor"
import "./preview.css"

const docsTheme = create({
  base: "light",
  fontBase: getReactToken("fontFamily", "base").value,
  fontCode: getReactToken("fontFamily", "code").value,
})

const preview: Preview = {
  decorators: [
    Story => (
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
          "Welcome",
          ["Tokens", "React", "Configuration"],
          "Getting started",
          ["Basic"],
          "Tokens",
          ["Styles", "Icons", "Responsive"],
          "React",
          [
            "Styles",
            ["StylesProvider", "getReactToken", "createTokens"],
            "Components",
            "Bindings",
          ],
          "Configuration",
          ["NPM", "Vite", "TypeScript", "Jest", "Rollup"],
        ],
      },
    },
  },
}

export default preview
