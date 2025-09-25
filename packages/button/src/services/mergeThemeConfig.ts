import { ButtonThemes, ThemeConfig } from "../types/themes"

/**
 * Deep merges a partial theme config with the default themes
 * @param defaultThemes - The default theme configuration
 * @param config - The partial config to merge
 * @returns Merged theme configuration
 */
const mergeThemeConfig = (
  defaultThemes: ButtonThemes,
  config?: ThemeConfig
): ButtonThemes => {
  if (!config) {
    return defaultThemes
  }

  // Deep merge helper function
  const deepMerge = (target: any, source: any): any => {
    if (!source) return target

    const result = { ...target }

    Object.keys(source).forEach((key) => {
      if (source[key] === null || source[key] === undefined) {
        return
      }

      if (typeof source[key] === "object" && !Array.isArray(source[key])) {
        result[key] = deepMerge(target[key] || {}, source[key])
      } else {
        result[key] = source[key]
      }
    })

    return result
  }

  return deepMerge(defaultThemes, config) as ButtonThemes
}

export default mergeThemeConfig