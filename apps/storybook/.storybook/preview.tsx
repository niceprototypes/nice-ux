import React from "react"
import type { Preview } from "@storybook/react-vite"
import { themes } from "storybook/theming"
import { addons } from "storybook/preview-api"
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode"
import { DocsContainer } from "@storybook/addon-docs/blocks"
import { StylesProvider } from "nice-react-styles"
import { ShikiPre } from "../src/components/ShikiCode"
import { ThemeToggle } from "../src/components/ThemeToggle"
import "nice-react-icon-vendor"
import "nice-react-image-vendor"
import "../src/nice/tokens"
import "./preview.css"

// Mirror storybook-dark-mode's state into <html data-theme="night|day"> so
// nice-styles' [data-theme] cascade applies to canvas, MDX docs prose, and
// any nice-* component dropped directly into MDX. The addon itself only
// knows light/dark — we translate to nice's day/night here.
addons.getChannel().on(DARK_MODE_EVENT_NAME, (isDark: boolean) => {
  document.documentElement.setAttribute("data-theme", isDark ? "night" : "day")
})

const preview: Preview = {
  decorators: [
    Story => (
      <StylesProvider>
        <Story />
        <ThemeToggle />
      </StylesProvider>
    ),
  ],
  parameters: {
    docs: {
      // Render fenced code in MDX prose through Shiki instead of Storybook's
      // <Source>, so prose snippets match DocsRow's day/night theming.
      components: {
        pre: ShikiPre,
      },
      // Wrap docs pages so ThemeToggle floats above MDX prose too — the
      // global decorator only fires for embedded <Story> renderings.
      container: ({ children, context }) => (
        <DocsContainer context={context}>
          {children}
          <ThemeToggle />
        </DocsContainer>
      ),
    },
    darkMode: {
      dark: themes.dark,
      light: themes.normal,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          "Welcome",
          ["Tokens", "React", "Configuration", "Why Nice UI?"],
          "Getting started",
          [
            "1 · Design tokens",
            [
              "1.1 · Simple",
              "1.2 · Themes",
              "1.3 · Breakpoints",
              "1.4 · Fonts",
              "1.5 · Responsive",
              "1.6 · Utility classes",
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
            ["StylesProvider", "FontLoader", "Theme", "getToken", "createTokens", "setBreakpoints"],
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
