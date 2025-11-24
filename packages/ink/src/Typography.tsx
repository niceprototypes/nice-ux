import * as React from "react"
import { StyledTypography } from "./styles"
import { TypographyProps } from "./types"

/**
 * Typography component for rendering text with flexible styling options.
 *
 * Provides comprehensive text styling control with semantic HTML elements,
 * CSS custom properties, and accessibility features. Font families are inlined
 * from nice-styles design tokens for consistent typography across applications.
 *
 * @example
 * ```tsx
 * // Simple heading
 * <Typography as="h1">Main Heading</Typography>
 *
 * // Custom size from nice-styles tokens
 * <Typography size="large">Large text</Typography>
 *
 * // Success message with semantic color
 * <Typography color="success">Operation completed successfully</Typography>
 *
 * // Error message
 * <Typography color="error">Something went wrong</Typography>
 *
 * // Link styling
 * <Typography color="link">Click here</Typography>
 *
 * // Code snippet with monospace font
 * <Typography code>const greeting = "Hello, World!"</Typography>
 *
 * // Custom line height
 * <Typography lineHeight="expanded">Highly readable text</Typography>
 * ```
 */
const Typography: React.FC<TypographyProps> = ({
  align,
  antialiased = false,
  legibilityOptimized = false,
  as = "p",
  children,
  className,
  code = false,
  color,
  lineHeight,
  size,
  weight,
}) => {
  return (
    <StyledTypography
      $align={align}
      $antialiased={antialiased}
      $legibilityOptimized={legibilityOptimized}
      $as={as}
      $code={code}
      $color={color}
      $lineHeight={lineHeight}
      $size={size}
      $weight={weight}
      as={as}
      className={className}
    >
      {children}
    </StyledTypography>
  )
}

export default Typography
