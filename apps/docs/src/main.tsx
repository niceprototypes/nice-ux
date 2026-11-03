import { createRoot } from "react-dom/client"
import App from "@niceprototypes/app"
import { plainRouter } from "@niceprototypes/app/adapters/plain"
import Flex from "@niceprototypes/flex"
import Logo from "@niceprototypes/logo"
import { applyTheme, StylesProvider } from "@niceprototypes/styles"
import "@niceprototypes/styles/reset.css"
import "@niceprototypes/icon-vendor"
import "@niceprototypes/image-vendor"
import "./tokens"
import DocsSearch from "./components/DocsSearch"
import ThemeToggle from "./components/ThemeToggle"
import { DocsSettingsContext } from "./components/DocsPage"
import { DocsNavigationContext } from "@niceprototypes/docs/components/DocsNavigation"
import { docsUrlOf, pages, redirectOf } from "./pages"

// Old addresses (moved pages, Storybook links) open where their page is now.
const redirect = redirectOf(window.location.pathname, window.location.search)
if (redirect) window.history.replaceState(null, "", redirect)

// The site opens in the OS theme; ThemeToggle switches it.
applyTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "day")

/** Docs links written for Storybook open the docs page of their Storybook id. */
const openStory = (storyId: string) => {
  const url = docsUrlOf(storyId)
  if (url) window.location.assign(url)
}

createRoot(document.getElementById("root")!).render(
  <StylesProvider links={[{ rel: "stylesheet", href: "/fonts/avenir.css" }]}>
    <DocsNavigationContext.Provider value={openStory}>
    <DocsSettingsContext.Provider value={<ThemeToggle />}>
      <App
        pages={pages}
        router={plainRouter}
        aria-label="Docs"
        navSize="base"
        header={
          <Flex direction="column" gap="base" grow={1}>
            <Logo />
            <DocsSearch />
          </Flex>
        }
      />
    </DocsSettingsContext.Provider>
    </DocsNavigationContext.Provider>
  </StylesProvider>,
)
