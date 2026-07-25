import React from "react"
import type { Preview } from "@storybook/react-vite"
import { themes } from "storybook/theming"
import { addons } from "storybook/preview-api"
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode"
import { DocsContainer } from "@storybook/addon-docs/blocks"
import { StylesProvider } from "nice-react-styles"
import { applyTheme } from "nice-styles"
import { ShikiPre } from "../src/components/ShikiPre"
import { StoryNavigation } from "../src/components/Story"
import "nice-react-icon-vendor"
import "nice-react-image-vendor"
import "../src/nice/tokens"
import "./preview.css"

// Mirror storybook-dark-mode's state into <html data-theme="night|day"> so
// nice-styles' [data-theme] cascade applies to canvas, MDX docs prose, and
// any nice-* component dropped directly into MDX. The addon itself only
// knows light/dark — we translate to nice's day/night here.
addons.getChannel().on(DARK_MODE_EVENT_NAME, (isDark: boolean) => {
  applyTheme(isDark ? "night" : "day")
})

const preview: Preview = {
  decorators: [
    Story => (
      <StylesProvider links={[{ rel: "stylesheet", href: "/fonts/avenir.css" }]}>
        <StoryNavigation />

        <Story />
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
      // Wrap docs pages so the StoryNavigation control bar floats above MDX prose
      // too — the global decorator only fires for embedded <Story> renderings.
      container: ({ children, context }: React.ComponentProps<typeof DocsContainer>) => (
        <DocsContainer context={context}>
          <StoryNavigation />
          {children}
        </DocsContainer>
      ),
    },
    darkMode: {
      // Default to light regardless of the OS color-scheme. When `current` is
      // set, storybook-dark-mode stops following prefers-color-scheme; the
      // toggle still works and the user's choice persists.
      current: "light",
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
          "Basics",
          [
            "Welcome",
            "Reset",
            "Tokens",
            "Fonts",
            "Icons",
            "Breakpoints",
            "Themes",
          ],
          "Scenarios",
          ["Easy", "Medium", "Hard"],
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
