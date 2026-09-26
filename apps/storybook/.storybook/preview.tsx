import React from "react"
import type { Preview } from "@storybook/react-vite"
import { themes } from "storybook/theming"
import { addons } from "storybook/preview-api"
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode"
import { DocsContainer } from "@storybook/addon-docs/blocks"
import { StylesProvider } from "nice-react-styles"
import { applyTheme } from "nice-styles"
import { ShikiPre } from "../src/components/ShikiPre"
import { StoryNavigation } from "nice-storybook-navigation"
import {
  storyNavigationIndexSequences,
  storyNavigationSequences,
} from "./storyNavigationSequences"
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
        <Story />
      </StylesProvider>
    ),
  ],
  parameters: {
    // Read by the addon's global decorator; the ids are this project's own.
    storyNavigation: {
      sequences: storyNavigationSequences,
      indexSequences: storyNavigationIndexSequences,
    },
    docs: {
      // Render fenced code in MDX prose through Shiki instead of Storybook's
      // <Source>, so prose snippets match CodeRow's day/night theming.
      components: {
        pre: ShikiPre,
      },
      // Wrap docs pages so the navigation bar floats above MDX prose too — the
      // addon's global decorator only fires for embedded <Story> renderings, and
      // this project overrides DocsContainer regardless. The bar is imported
      // from the addon rather than rendered by it here, so the sequences come
      // through the same parameter the decorator reads.
      container: ({ children, context }: React.ComponentProps<typeof DocsContainer>) => (
        <DocsContainer context={context}>
          <StoryNavigation
            sequences={storyNavigationSequences}
            indexSequences={storyNavigationIndexSequences}
          />
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
          "Manifest",
          ["Welcome", "Discipline", "Read", "Edit", "Build", "Publish", "Topics"],
          "Scenarios",
          ["Easy", "Medium", "Hard"],
          "Tokens",
          // Docs first, then the grouped folders, then every flat token page.
          // Docs, then the grouped folders alphabetically, then the flat pages.
          // Colors pins transformColor last: it is the only hand-authored page in
          // that folder, so without it the load order decides where it lands.
          ["Docs", "Animation", "Borders", "Colors", ["*", "transformColor"], "Fonts", "Sizes", "*"],
          "Components",
          // Grouped folders first, then the flat component pages — as in Tokens.
          // Each component (inside Forms or flat) orders Docs, Tokens, then props.
          ["Forms", ["*", ["Docs", "Tokens", "*"]], "*", ["Docs", "Tokens", "*"]],
          "Bindings",
          ["useBreakpoint", "useDevice", "useTheme"],
          "Storybook",
          ["Docs", "Theme", "Navigation", "Spinner"],
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
