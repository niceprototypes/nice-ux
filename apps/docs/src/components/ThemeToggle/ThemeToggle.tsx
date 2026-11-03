import * as React from "react"
import Toggle from "@niceprototypes/toggle"
import { applyTheme, type ThemeName } from "@niceprototypes/styles"
import { StyledThemeToggleLabel } from "./ThemeToggle.styles"

/** The theme on `<html data-theme>`, which `main.tsx` sets from the OS preference before the first render. */
const readTheme = (): ThemeName => (document.documentElement.getAttribute("data-theme") === "night" ? "night" : "day")

/**
 * ThemeToggle
 *
 * The day/night switch: on is night. It writes `<html data-theme>` through `applyTheme`, which
 * flips every token.
 */
const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = React.useState(readTheme)
  return (
    <Toggle
      size="small"
      checked={theme === "night"}
      onChange={checked => {
        const next = checked ? "night" : "day"
        applyTheme(next)
        setTheme(next)
      }}
    >
      <StyledThemeToggleLabel>Dark</StyledThemeToggleLabel>
    </Toggle>
  )
}

export default ThemeToggle
