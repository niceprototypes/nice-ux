import { setTokens } from "nice-react-styles"

/**
 * Storybook-local token overrides.
 *
 * Imported by `.storybook/preview.tsx` for the side effect — `setTokens`
 * registers the overrides and injects the CSS at module load.
 */
const AppTokenMap = {
  backgroundColor: {
    dark: {
      day: "hsla(212, 10%, 100%, 1)",
      night: "hsla(212, 10%, 15%, 1)",
    }
  },
  fontFamily: {
    base: "'Avenir Next', -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif",
    heading:
      "'Avenir Next', -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif",
    demo: "'Crimson Pro', serif",
  },
  fontSize: {
    larger: "32px",
    // large: "22px",
  },
  icon: {
    size: {
      // smaller: "12px",
      // small: "16px",
      // base: "11px",
      // larger: "32px",
    },
  },
  button: {
    // Component-token override (--np--button--icon--size). Resizes button icons
    // only, independent of the global --np--icon--size.
    icon: {
      size: "10px",
    },
  },
  color: {
    light: {
      day: "hsla(210, 5%, 25%, 1)",
      night: "hsla(210, 5%, 95%, 0.85)",
    },
    lighter: {
      day: "hsla(210, 5%, 50%, 1)",
      night: "hsla(210, 5%, 95%, 0.55)",
    },
  },
} as const

setTokens(AppTokenMap)
