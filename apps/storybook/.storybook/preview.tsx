import React from "react"
import type { Preview } from "@storybook/react-vite"
import { themes } from "storybook/theming"
import { addons } from "storybook/preview-api"
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode"
import { DocsContainer } from "@storybook/addon-docs/blocks"
import { StylesProvider } from "nice-react-styles"
import { ShikiPre } from "../src/components/CodeBlock"
import { StoryFooter } from "../src/components/Story"
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
      <StylesProvider links={[{ rel: "stylesheet", href: "/fonts/avenir.css" }]}>
        <Story />
        <StoryFooter />
      </StylesProvider>
    ),
  ],
  parameters: {
    docs: {
      // Render fenced code in MDX prose through Shiki instead of Storybook's
      // <Source>, so prose snippets match CodeRow's day/night theming.
      components: {
        pre: ShikiPre,
      },
      // Wrap docs pages so the StoryFooter control bar floats above MDX prose
      // too — the global decorator only fires for embedded <Story> renderings.
      container: ({ children, context }: React.ComponentProps<typeof DocsContainer>) => (
        <DocsContainer context={context}>
          {children}
          <StoryFooter />
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
          "Getting started",
          [
            "Welcome",
            "1 · Reset",
            "2 · Tokens",
            "3 · Fonts",
            "4 · Icons",
            "5 · Breakpoints",
            "6 · Themes",
            "Kitchen sink",
          ],
          "Tokens",
          ["Modules", "Components"],
          "Components",
          "Bindings",
          ["useBreakpoint", "useDevice", "useTheme"],
          "Configuration",
          ["NPM", "Vite", "TypeScript", "Jest", "Rollup"],
          "Toolkit",
          [
            "1. Linking",
            "2. Dedupe",
            "3. Building",
            "4. Dev & Watch",
            "5. Reset & Caches",
            "6. Publishing",
            "7. Troubleshooting",
          ],
        ],
      },
    },
  },
}

export default preview
