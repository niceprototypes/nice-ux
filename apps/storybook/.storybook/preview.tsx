import React from "react"
import type { Preview } from "@storybook/react-vite"
import { addons } from "storybook/preview-api"
import { DocsContainer } from "@storybook/addon-docs/blocks"
import { navigate } from "@storybook/addon-links"
import { DocsNavigationContext } from "@niceprototypes/docs/components/DocsNavigation"
import { StylesProvider } from "@niceprototypes/styles"
import { DARK_MODE_EVENT } from "@niceprototypes/storybook-theme"
import { applyTheme } from "@niceprototypes/styles"
import { ShikiPre } from "@niceprototypes/docs/components/ShikiPre"
import ContentFlex from "@niceprototypes/docs/nice/ContentFlex"
import { getItemForEntry } from "@niceprototypes/docs/data"
import { StoryNavigation } from "@niceprototypes/storybook-navigation"
import {
  storyNavigationIndexSequences,
  storyNavigationSequences,
} from "./storyNavigationSequences"
import "@niceprototypes/icon-vendor"
import "@niceprototypes/image-vendor"
import "@niceprototypes/docs/nice/tokens"
import "./preview.css"

// Mirror the manager's theme into <html data-theme="night|day"> so
// @niceprototypes/styles' [data-theme] cascade applies to canvas, MDX docs prose, and
// any nice-* component dropped directly into MDX.
addons.getChannel().on(DARK_MODE_EVENT, (isDark: boolean) => {
  applyTheme(isDark ? "night" : "day")
})

/** Docs links (WelcomeLink, ArrowLink) open pages through the manager, so they route from inside the docs iframe. */
const openStory = (storyId: string) => navigate({ storyId })

const preview: Preview = {
  decorators: [
    Story => (
      <StylesProvider links={[{ rel: "stylesheet", href: "/fonts/avenir.css" }]}>
        <DocsNavigationContext.Provider value={openStory}>
          <Story />
        </DocsNavigationContext.Provider>
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
      // Wrap docs pages so they carry the navigation bar — the addon's global
      // decorator skips docs pages, and this project overrides DocsContainer
      // regardless. The bar is imported
      // from the addon rather than rendered by it here, so the sequences come
      // through the same parameter the decorator reads. The page's `wrapped`
      // setting in packages/docs/src/data/storybook.json caps it at the content width.
      container: ({ children, context }: React.ComponentProps<typeof DocsContainer>) => (
        <DocsContainer context={context}>
          <DocsNavigationContext.Provider value={openStory}>
          {/* sb-unstyled: Storybook's docs typography stays out of the bar's Nice components */}
          <div className="sb-unstyled">
            <StoryNavigation
              sequences={storyNavigationSequences}
              indexSequences={storyNavigationIndexSequences}
            />
          </div>
          <ContentFlex
            direction="column"
            wrapped={getItemForEntry(new URLSearchParams(window.location.search).get("id") ?? "")?.settings.wrapped === true}
          >
            {children}
          </ContentFlex>
          </DocsNavigationContext.Provider>
        </DocsContainer>
      ),
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
          "Onboarding",
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
          // Docs first, then the grouped folders, then every flat token page.
          // Docs, then the grouped folders alphabetically, then the flat pages.
          // Colors pins transformColor last: it is the only hand-authored page in
          // that folder, so without it the load order decides where it lands.
          ["Docs", "Animation", "Borders", "Colors", ["*", "transformColor"], "Fonts", "Sizes", "*"],
          "Components",
          // Grouped folders first, then the flat component pages — as in Tokens.
          // Each component (inside Forms or flat) puts its Docs page (Docs, Tokens and every
          // prop as sections) before its stories.
          ["Forms", ["*", ["Docs", "*"]], "*", ["Docs", "*"]],
          "Bindings",
          ["useBreakpoint", "useDevice", "useTheme"],
          "Storybook",
          ["Docs", "Theme", "Navigation", "Spinner"],
          "Configuration",
          ["NPM", "Vite", "TypeScript", "Jest", "Rollup"],
          "CLI",
          [
            "Linking",
            "Dedupe",
            "Building",
            "Dev & Watch",
            "Reset & Caches",
            "Publishing",
            "Troubleshooting",
          ],
        ],
      },
    },
  },
}

export default preview
