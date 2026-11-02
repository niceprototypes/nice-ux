import { THEME_STORAGE_KEY } from "../constants"

/**
 * Source of `resolveTheme()`, inlined into both head scripts. Reads the theme
 * @niceprototypes/storybook-theme persists, synchronously: `night` when stored dark,
 * otherwise `day`.
 */
export const themeResolverSource = `const resolveTheme = () => {
    try {
      const s = JSON.parse(localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)}) || "null")
      if (s && s.current === "dark") return "night"
    } catch (e) {}
    return "day"
  }`
