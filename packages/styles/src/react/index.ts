/**
 * @niceprototypes/styles — package entry.
 *
 * React bindings for @niceprototypes/styles: `StylesProvider` (fonts, device and theme
 * detection), `Theme` (subtree theme pin), `setTokens` (register + inject
 * token CSS), and breakpoint helpers. Also re-exports the @niceprototypes/styles public
 * API so React apps import tokens from this one package.
 */

// Components and their context hooks
export { StylesProvider, useDevice, useTheme, useLocale, MOBILE_USER_AGENTS } from './components/StylesProvider'
export type {
  DeviceState,
  ThemeContextValue,
  LocaleCodeType,
  LocaleDirectionType,
  LocaleValueType,
} from './components/StylesProvider'
export { Theme } from './components/Theme'
export type { ThemeProps } from './components/Theme'

// Service exports
export { setTokens, setBreakpoints } from './services/setTokens'
export { withBreakpoints, useBreakpoint } from './services/withBreakpoints'
export type { BreakpointKey, BreakpointOverride, WithBreakpointsProps } from './services/withBreakpoints'

// Re-export the whole framework-neutral token API (src/index.ts), so the package
// root serves both the tokens and the React bindings.
export * from '../index'

// Package-local types
export type { StylesProviderProps } from './components/StylesProvider/StylesProvider.types'
export type { Breakpoints } from './types'
