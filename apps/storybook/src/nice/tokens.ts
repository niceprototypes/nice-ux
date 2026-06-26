import { setTokens } from "nice-react-styles"

/**
 * Storybook-local token overrides.
 *
 * Imported by `.storybook/preview.tsx` for the side effect — `setTokens`
 * registers the overrides and injects the CSS at module load.
 */
const AppTokenMap = {
  fontFamily: {
    base: "'Avenir Next', -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif",
    heading: "'Avenir Next', -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif",
    // Custom font-family token — a distinctive serif used to demo a custom
    // fontFamily variant (e.g. the color table previews). Emits
    // --np--font-family--demo. Crimson Pro is loaded from Google Fonts via
    // StylesProvider in .storybook/preview.tsx.
    demo: "'Crimson Pro', serif",
  },
  fontSize: {
    larger: "24px",
    large: "20px",
  },
  icon: {
    size: {
      smaller: "12px",
      small: "16px",
      base: "11px",
      larger: "32px"
    }
  },
} as const

setTokens(AppTokenMap)
