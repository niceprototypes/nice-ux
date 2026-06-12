import { setTokens } from "nice-react-styles"

/**
 * Storybook-local token overrides.
 *
 * Imported by `.storybook/preview.tsx` for the side effect — `setTokens`
 * registers the overrides and injects the CSS at module load.
 */
const AppTokenMap = {
  fontFamily: {
    base: "Avenir Next, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    heading:
      "Avenir Next, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  },
  fontSize: {
    larger: "24px",
    large: "20px",
  },
  gap: {
    smaller: "8px",
  },
  icon: {
    size: {
      base: "14px",
      larger: "32px"
    }
  },
} as const

setTokens(AppTokenMap)
