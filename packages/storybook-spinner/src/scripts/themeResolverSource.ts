import { THEME_STORAGE_KEY } from "../constants"

/**
 * Source of `resolveTheme()`, inlined into both head scripts. Mirrors
 * storybook-dark-mode's end state synchronously: the stored mode only when the
 * user set it explicitly, otherwise `day`.
 */
export const themeResolverSource = `const resolveTheme = () => {
    try {
      const s = JSON.parse(localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)}) || "null")
      if (s && s.userHasExplicitlySetTheTheme) return s.current === "dark" ? "night" : "day"
    } catch (e) {}
    return "day"
  }`
