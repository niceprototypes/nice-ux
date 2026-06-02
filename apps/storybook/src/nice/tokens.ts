import { createTokens } from "nice-react-styles"

/**
 * Storybook-local token overrides.
 *
 * Imported by `.storybook/preview.tsx` for the side effect — `createTokens`
 * registers the overrides and injects the CSS at module load.
 */
const AppTokenMap = {
  fontSize: {
    larger: "24px",
    large: "20px",
  },
  gap: {
    smaller: "8px",
  },
} as const

createTokens(AppTokenMap)
