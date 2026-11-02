import { createRoot } from "react-dom/client"
import App from "@niceprototypes/app"
import { plainRouter } from "@niceprototypes/app/adapters/plain"
import Flex from "@niceprototypes/flex"
import Logo from "@niceprototypes/logo"
import { applyTheme, StylesProvider } from "@niceprototypes/styles"
import "@niceprototypes/icon-vendor"
import "@niceprototypes/image-vendor"
import "./tokens"
import DocsSearch from "./components/DocsSearch"
import ThemeToggle from "./components/ThemeToggle"
import { DocsSettingsContext } from "./components/DocsPage"
import { pages } from "./pages"

// The site opens in the OS theme; ThemeToggle switches it.
applyTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "day")

createRoot(document.getElementById("root")!).render(
  <StylesProvider links={[{ rel: "stylesheet", href: "/fonts/avenir.css" }]}>
    <DocsSettingsContext.Provider value={<ThemeToggle />}>
      <App
        pages={pages}
        router={plainRouter}
        aria-label="Docs"
        header={
          <Flex direction="column" gap="base" grow={1}>
            <Logo />
            <DocsSearch />
          </Flex>
        }
      />
    </DocsSettingsContext.Provider>
  </StylesProvider>,
)
