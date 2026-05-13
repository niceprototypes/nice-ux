import React from "react"
import type { Preview } from "@storybook/react-vite"
import { create } from "storybook/theming"
import { StylesProvider, getReactTokenValue } from "nice-react-styles"
import "nice-react-icon-vendor"
import "nice-react-image-vendor"
import "./preview.css"

const docsTheme = create({
  base: "light",
  fontBase: getReactTokenValue("fontFamily", "base"),
  fontCode: getReactTokenValue("fontFamily", "code"),
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
          [
            "1 · Tokens",
            [
              "1.1 · Simple",
              "1.2 · Modes",
              "1.3 · Breakpoints",
              "1.4 · Responsive",
              "1.5 · Utility classes",
            ],
            "2 · React getters",
            "3 · React setters",
            "4 · Components",
          ],
          "Tokens",
          ["Styles", "Icons", "Responsive", "Breakpoints"],
          "React",
          [
            "Styles",
            ["StylesProvider", "getReactToken", "createTokens", "setBreakpoints"],
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
