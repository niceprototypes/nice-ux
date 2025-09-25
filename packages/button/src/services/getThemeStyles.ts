import { ButtonThemes, ThemeDesignValues } from "../types/themes"
import { ButtonModeType, ButtonStatusType, ButtonStateType } from "../types"

/**
 * Default theme styles as fallback
 */
const DEFAULT_THEME_STYLES: ThemeDesignValues = {
  backgroundColor: "#000",
  borderColor: "#000",
  color: "#fff",
}

/**
 * Gets the theme styles for a specific mode/status/state combination
 * @param themes - The complete themes object
 * @param mode - The current mode (light/dark)
 * @param status - The button status (primary/secondary/etc)
 * @param state - The button state (default/disabled/etc)
 * @returns The theme design values for the specified combination
 */
export default function getThemeStyles(
  themes: ButtonThemes,
  mode: ButtonModeType,
  status: ButtonStatusType,
  state: ButtonStateType
): ThemeDesignValues {
  const modeTheme = themes[mode]
  const statusTheme = modeTheme?.[status]

  if (statusTheme && state in statusTheme) {
    return statusTheme[state]
  }

  // Fallback to primary/default if status or state not found
  return themes.light.primary?.default || DEFAULT_THEME_STYLES
}