import { setTokens } from "@niceprototypes/styles"
import { TOKENS as THEME_TOKENS } from "@niceprototypes/storybook-theme"

/**
 * Storybook-local token overrides.
 *
 * Imported by `.storybook/preview.tsx` for the side effect — `setTokens`
 * registers the overrides and injects the CSS at module load. The one call
 * includes @niceprototypes/storybook-theme's tokens; the app's own entries come last, so
 * they can override a theme value. Read storybook-local tokens through the
 * exported `getToken`, which is typed for this map.
 */
const AppTokenMap = {
  // LifecycleStory step durations; a step picks a variant by name.
  lifecycleStep: {
    base: "1200ms",
    long: "2000ms",
  },
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
    larger: "40px",
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

/** A LifecycleStory step duration — a `lifecycleStep` token variant. */
export type LifecycleStepVariant = keyof (typeof AppTokenMap)["lifecycleStep"]

export const getToken = setTokens({ ...THEME_TOKENS, ...AppTokenMap })
