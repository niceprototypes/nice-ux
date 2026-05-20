import React from "react"
import type { Preview } from "@storybook/react-vite"
import { create } from "storybook/theming"
import { DocsContainer } from "@storybook/addon-docs/blocks"
import { StylesProvider, Mode, getTokenValue } from "nice-react-styles"
import "nice-react-icon-vendor"
import "nice-react-image-vendor"
import "../src/nice/tokens"
import "./preview.css"

const docsTheme = create({
  base: "light",
  fontBase: getTokenValue("fontFamily", "base"),
  fontCode: getTokenValue("fontFamily", "code"),
})

const preview: Preview = {
  decorators: [
    Story => (
      <StylesProvider>
        <Mode name="day">
          <Story />
        </Mode>
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
      // Wraps the entire docs page (MDX prose + embedded Story blocks) in
      // Mode. The Story decorator above only wraps Story subtrees, so MDX
      // content rendered outside <Story> needs this container-level wrap
      // to inherit the data-theme cascade.
      container: ({ children, context }: { children: React.ReactNode; context: any }) => (
        <DocsContainer context={context}>
          <Mode name="day">{children}</Mode>
        </DocsContainer>
      ),
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
            ["StylesProvider", "FontLoader", "Mode", "getToken", "createTokens", "setBreakpoints"],
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
