import * as React from "react"
import { StyledTypography } from "./styles"
import { TypographyProps } from "./types"
import getEffectiveFontWeight from "./services/getEffectiveFontWeight"
import getEffectiveLineHeight from "./services/getEffectiveLineHeight"

const Typography: React.FC<TypographyProps> = ({
  align,
  antialiased = true,
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
  // Determine color based on status if provided
  const statusColor = status ? `var(--content-color-${status})` : color

  return (
    <StyledTypography
      $align={align}
      $antialiased={antialiased}
      $legibilityOptimized={legibilityOptimized}
      $as={as}
      $code={code}
      $color={statusColor}
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
