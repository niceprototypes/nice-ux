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
 *       <Typography as="h1" size="larger">Main Heading</Typography>
 *       <Typography as="p" color="base">
 *         Body paragraph with base color
 *       </Typography>
 *       <Typography color="success">Success message</Typography>
 *       <Typography color="error">Error message</Typography>
 *       <Typography color="link">Link text</Typography>
 *     </>
 *   )
 * }
 * ```
 *
 * Available color values from nice-styles ForegroundColorType:
 * - "lighter" - Very light foreground color
 * - "light" - Light foreground color
 * - "medium" - Medium foreground color
 * - "heavy" - Heavy/dark foreground color
 * - "base" - Base/default foreground color
 * - "disabled" - Disabled state color
 * - "link" - Link color
 * - "success" - Success state color
 * - "warning" - Warning state color
 * - "error" - Error state color
 *
 * @module nice-react-typography
 */

export { default } from "./Typography"
export { default as Typography } from "./Typography"
export type { TypographyProps, AsType, AlignType } from "./types"
