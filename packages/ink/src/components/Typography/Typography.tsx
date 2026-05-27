import * as React from "react"
import { Theme } from "nice-react-styles"
import { StyledTypography } from "./Typography.styles"
import { TypographyProps } from "./Typography.types"

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
    <StyledTypography
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
    </StyledTypography>
  )

  return theme ? <Theme name={theme}>{element}</Theme> : element
}

export default Typography
