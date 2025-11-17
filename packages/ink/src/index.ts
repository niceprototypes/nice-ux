/**
 * nice-react-typography
 *
 * A flexible and customizable Typography component for React with styled-components.
 * Provides semantic HTML elements, CSS custom properties, and accessibility features.
 *
 * @example
 * ```tsx
 * import { Typography } from 'nice-react-typography'
 *
 * function App() {
 *   return (
 *     <>
 *       <Typography as="h1" size="3rem">Main Heading</Typography>
 *       <Typography as="p" color="var(--foreground-color-base)">
 *         Body paragraph with semantic color
 *       </Typography>
 *     </>
 *   )
 * }
 * ```
 *
 * @module nice-react-typography
 */

export { default } from "./Typography"
export { default as Typography } from "./Typography"
export type { TypographyProps, TypographyAsType, AlignType, LineHeightType } from "./types"
