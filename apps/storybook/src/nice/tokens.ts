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
  },
  fontSize: {
    larger: "24px",
    large: "20px",
  },
  icon: {
    size: {
      base: "14px",
      larger: "32px"
    }
  },
} as const

setTokens(AppTokenMap)
