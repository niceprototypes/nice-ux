import { ButtonModeType, ButtonStatusType, ButtonStateType } from "./index"

/**
 * Design values for a specific mode/status/state combination
 */
export interface ThemeDesignValues {
  backgroundColor: string
  borderColor: string
  color: string
  borderWidth?: string
  fontWeight?: string
  borderRadius?: string
}

/**
 * State theme mapping
 */
export type StateTheme = {
  [K in ButtonStateType]: ThemeDesignValues
}

/**
 * Status theme mapping
 */
export type StatusTheme = {
  [K in ButtonStatusType]?: StateTheme
}

/**
 * Mode theme mapping
 */
export type ModeTheme = {
  [K in ButtonModeType]: StatusTheme
}

/**
 * Complete theme structure
 */
export type ButtonThemes = ModeTheme

/**
 * Deep partial type helper for nested partial objects
 */
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

/**
 * Theme configuration type that allows partial overrides
 */
export type ThemeConfig = DeepPartial<ButtonThemes>
