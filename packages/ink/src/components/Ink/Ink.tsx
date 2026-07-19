import * as React from "react"
import { Theme } from "nice-react-styles"
import { StyledInk } from "./Ink.styles"
import { InkProps } from "./Ink.types"

/**
 * Ink component for rendering text with flexible styling options.
 *
 * Provides comprehensive text styling control with semantic HTML elements,
 * CSS custom properties, and accessibility features. Font families are inlined
 * from nice-styles design tokens for consistent text styling across applications.
 *
 * @example
 * ```tsx
 * // Simple heading
 * <Ink as="h1">Main Heading</Ink>
 *
 * // Custom size from nice-styles tokens
 * <Ink size="large">Large text</Ink>
 *
 * // Success message with semantic color
 * <Ink color="success">Operation completed successfully</Ink>
 *
 * // Error message
 * <Ink color="error">Something went wrong</Ink>
 *
 * // Link styling
 * <Ink color="link">Click here</Ink>
 *
 * // Code snippet with monospace font
 * <Ink code>const greeting = "Hello, World!"</Ink>
 *
 * // Custom line height
 * <Ink lineHeight="expanded">Highly readable text</Ink>
 * ```
 */
const Ink: React.FC<InkProps> = ({
  align,
  antialiased,
  legibilityOptimized = false,
  as = "p",
  children,
  className = "sb-unstyled",
  code = false,
  color,
  theme,
  lineClamp,
  lineHeight,
  size,
  style,
  weight,
  wordBreak,
}) => {
  const effectiveAntialiased = antialiased ?? theme === "night"

  const element = (
    <StyledInk
      $align={align}
      $antialiased={effectiveAntialiased}
      $legibilityOptimized={legibilityOptimized}
      $as={as}
      $code={code}
      $color={color}
      $lineClamp={lineClamp}
      $lineHeight={lineHeight}
      $size={size}
      $weight={weight}
      $wordBreak={wordBreak}
      as={as}
      className={className}
      style={style}
    >
      {children}
    </StyledInk>
  )

  return theme ? <Theme name={theme}>{element}</Theme> : element
}

export default Ink
