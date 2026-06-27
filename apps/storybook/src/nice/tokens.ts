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
    larger: "32px",
    large: "22px",
  },
  icon: {
    size: {
      smaller: "12px",
      small: "16px",
      base: "11px",
      larger: "32px"
    }
  },
  color: {
    // Storybook-local night overrides for the muted text colors. `day` keeps the
    // canonical module value (no day change); edit `night` to adjust how `light`
    // and `lighter` render under the dark theme. Emits
    // --np--color--light--night / --np--color--lighter--night.
    light: { day: "hsla(210, 5%, 25%, 1)", night: "hsla(210, 5%, 95%, 0.85)" },
    lighter: { day: "hsla(210, 5%, 50%, 1)", night: "hsla(210, 5%, 95%, 0.55)" },
  },
} as const

setTokens(AppTokenMap)
