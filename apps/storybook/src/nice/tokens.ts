import { createTokens } from "nice-react-styles"

/**
 * Storybook-local token overrides.
 *
 * Imported by `.storybook/preview.tsx` for the side effect — `createTokens`
 * registers the overrides and injects the CSS at module load.
 */
const AppTokenMap = {
  backgroundColor: {
    dark: {
      day: "#f3f3f3",
    },
  },
} as const

const appTokens = createTokens(AppTokenMap)
export const AppStyles = appTokens.GlobalStyles
