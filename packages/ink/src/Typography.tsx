import * as React from "react"
import { StyledTypography } from "./styles"
import { TypographyProps } from "./types"
import getEffectiveColor from "./services/getEffectiveColor"
import getEffectiveFontWeight from "./services/getEffectiveFontWeight"
import getEffectiveLineHeight from "./services/getEffectiveLineHeight"

/**
 * Typography component for rendering text with flexible styling options.
 *
 * Provides comprehensive text styling control with semantic HTML elements,
 * CSS custom properties, and accessibility features.
 *
 * @example
 * ```tsx
 * // Simple heading
 * <Typography as="h1">Main Heading</Typography>
 *
 * // Custom size and weight
 * <Typography size="1.125rem" weight="500">Custom text</Typography>
 *
 * // Using CSS variables
 * <Typography size="var(--text-lg)" weight="var(--font-semibold)">
 *   Themed text
 * </Typography>
 *
 * // Status-based color
 * <Typography status="success">Success message</Typography>
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
  status,
  weight,
}) => {
  return (
    <StyledTypography
      $align={align}
      $antialiased={antialiased}
      $legibilityOptimized={legibilityOptimized}
      $as={as}
      $code={code}
      $color={getEffectiveColor(color, status)}
      $lineHeight={getEffectiveLineHeight(lineHeight, as)}
      $size={size}
      $weight={getEffectiveFontWeight(weight, as)}
      as={as}
      className={className}
    >
      {children}
    </StyledTypography>
  )
}

export default Typography
