import { createRoot } from "react-dom/client"
import App from "@niceprototypes/app"
import { plainRouter } from "@niceprototypes/app/adapters/plain"
import Flex from "@niceprototypes/flex"
import Logo from "@niceprototypes/logo"
import { applyTheme, StylesProvider } from "@niceprototypes/styles"
import "@niceprototypes/icon-vendor"
import "@niceprototypes/image-vendor"
import "./tokens"
import ThemeToggle from "./components/ThemeToggle"
import { pages } from "./pages"

// The site opens in the OS theme; ThemeToggle switches it.
applyTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "day")

createRoot(document.getElementById("root")!).render(
  <StylesProvider links={[{ rel: "stylesheet", href: "/fonts/avenir.css" }]}>
    <App
      pages={pages}
      router={plainRouter}
      aria-label="Docs"
      header={
        <Flex grow={1} gap="large" alignItems="center" justifyContent="space-between">
          <Logo />
          <ThemeToggle />
        </Flex>
      }
    />
  </StylesProvider>,
)
