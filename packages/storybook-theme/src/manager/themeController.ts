import { addons } from "storybook/manager-api"
import { DOCS_RENDERED, STORY_CHANGED } from "storybook/internal/core-events"
import { themes, type ThemeVars } from "storybook/theming"
import { applyTheme } from "@niceprototypes/styles"
import { ADDON_ID, DARK_MODE_EVENT, THEME_STORAGE_KEY, UPDATE_DARK_MODE_EVENT } from "../constants"

type Mode = "dark" | "light"

/** Manager theme fields set by the consumer's `addons.setConfig({ theme })`; a switch keeps them. */
const CONSUMER_THEME_KEYS: (keyof ThemeVars)[] = ["brandTitle", "brandUrl", "brandImage", "brandTarget", "fontBase", "fontCode"]

/** The persisted choice, `light` when none is stored. */
const readMode = (): Mode => {
  try {
    return JSON.parse(window.localStorage.getItem(THEME_STORAGE_KEY) || "{}").current === "dark" ? "dark" : "light"
  } catch {
    return "light"
  }
}

const writeMode = (mode: Mode) => {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify({ current: mode }))
  } catch {
    // Storage unavailable: the choice lasts for this page only.
  }
}

/**
 * Owns the Storybook theme in the manager: applies the persisted choice, switches on
 * `UPDATE_DARK_MODE` (the navigation bar's toggle) and persists it, and reports it to the
 * preview with `DARK_MODE` whenever a story or docs page renders.
 */
export const startThemeController = () => {
  addons.register(`${ADDON_ID}/theme`, (api) => {
    const channel = addons.getChannel()
    let mode = readMode()

    const apply = () => {
      const consumerTheme: Partial<ThemeVars> = addons.getConfig().theme ?? {}
      const kept = Object.fromEntries(
        CONSUMER_THEME_KEYS.filter((key) => key in consumerTheme).map((key) => [key, consumerTheme[key]])
      )
      api.setOptions({ theme: { ...themes[mode], ...kept } })
      applyTheme(mode === "dark" ? "night" : "day")
      channel.emit(DARK_MODE_EVENT, mode === "dark")
    }

    channel.on(UPDATE_DARK_MODE_EVENT, () => {
      mode = mode === "dark" ? "light" : "dark"
      writeMode(mode)
      apply()
    })
    channel.on(STORY_CHANGED, apply)
    channel.on(DOCS_RENDERED, apply)
    apply()
  })
}
