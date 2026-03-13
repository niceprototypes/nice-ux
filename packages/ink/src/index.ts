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
 * - "lightest" - Lightest foreground color
 * - "lighter" - Very light foreground color
 * - "light" - Light foreground color
 * - "base" - Base/default foreground color
 * - "disabled" - Disabled state color
 * - "link" - Link color
 * - "success" - Success state color
 * - "warning" - Warning state color
 * - "error" - Error state color
 *
 * @module nice-react-typography
 */

// Main component export
export { default } from "./components/Typography"

// Type exports
export { TypographyTypes } from "./components/Typography"
export type { TypographyProps, TypographyModeType, AsType, AlignType } from "./components/Typography"

// Token exports
export { TypographyStyles, getTypographyToken } from "./tokens"
