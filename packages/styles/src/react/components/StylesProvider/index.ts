/**
 * StylesProvider module exports
 */

// Provider component
export { StylesProvider } from './StylesProvider.js'
export type { StylesProviderProps } from './StylesProvider.types.js'

// Device detection — read with useDevice when `detectDevice` is set
export { useDevice } from './DeviceContext.js'
export type { DeviceState } from './DeviceContext.js'
export { MOBILE_USER_AGENTS } from './useDeviceDetection.js'

// OS color-scheme detection — read with useTheme when `detectTheme` is set
export { useTheme } from './ThemeContext.js'
export type { ThemeContextValue } from './ThemeContext.js'

// Locale and text direction — explicit `locale` / `dir` props, else document / navigator
export { useLocale } from './LocaleContext.js'
export type { LocaleCodeType, LocaleDirectionType, LocaleValueType } from './LocaleContext.js'