/**
 * Styled Components for Typography
 *
 * This module contains the styled-components implementation for the Typography component.
 * It handles dynamic styling based on props and provides fallback values for CSS custom properties.
 *
 * @module styles
 */

import styled, { css } from "styled-components"
import { getReactToken, type ForegroundColorType, type FontSizeType, type FontWeightType, type LineHeightType, type ModeType } from "nice-react-styles"
import { TypographyAsType, TypographyAlignType, TypographyLineClampType, TypographyWordBreakType } from "./Typography.types"
import { styleAntialiasing } from "../../utilities/styleAntialiasing"

/**
 * CSS styles for optimized text legibility
 *
 * Applies hardware acceleration and 3D transform optimizations for better text rendering:
 * - `backface-visibility: hidden` - Prevents text from showing through during transforms
 * - `perspective: 1000px` - Enables 3D rendering context
 * - `transform-style: preserve-3d` - Maintains 3D positioning of child elements
 * - `will-change: transform` - Hints browser to optimize for transform animations
 *
 * @remarks
 * Use this when you need crisp text rendering during animations or transforms.
 * May impact performance on low-end devices.
 */
export const styleOptimizedLegibility = css`
  backface-visibility: hidden;
  perspective: 1000px;
  transform-style: preserve-3d;
  will-change: transform;
`

const isHeading = ($as: TypographyAsType): boolean =>
  $as === "h1" || $as === "h2" || $as === "h3" || $as === "h4"

const getFontFamily = ({ $as, $code }: { $as: TypographyAsType; $code?: boolean }) => {
  if ($code) {
    return css`
      font-family: ${getReactToken("fontFamily", "code").var};
    `
  }

  if (isHeading($as)) {
    return css`
      font-family: ${getReactToken("fontFamily", "heading").var};
    `
  }

  return css`
    font-family: ${getReactToken("fontFamily", "base").var};
  `
}

const getColor = ({ $color, $mode }: { $color?: ForegroundColorType; $mode?: ModeType }) => {
  if (!$color) return css`color: inherit;`

  return css`
    color: ${getReactToken("foregroundColor", $color, $mode).var};
  `
}

const getFontSize = ({ $as, $size }: { $as: TypographyAsType; $size?: FontSizeType }) => {
  let effectiveFontSize: FontSizeType

  if ($size) {
    effectiveFontSize = $size
  } else {
    // Default sizes for headings
    switch ($as) {
      case "h1":
        effectiveFontSize = "larger"
        break
      case "h2":
        effectiveFontSize = "large"
        break
      case "h3":
        effectiveFontSize = "base"
        break
      default:
        effectiveFontSize = "small"
    }
  }

  return css`
    font-size: ${getReactToken("fontSize", effectiveFontSize).var};
  `
}

const getFontWeight = ({ $as, $weight }: { $as: TypographyAsType; $weight?: FontWeightType }) => {
  if ($weight) {
    return css`
      font-weight: ${getReactToken("fontWeight", $weight).var};
    `
  }

  // Default weights for headings
  if ($as === "h1" || $as === "h2" || $as === "h3") {
    return css`
      font-weight: ${getReactToken("fontWeight", "bold").var};
    `
  }

  return undefined
}

const getTextAlign = ({ $align }: { $align?: TypographyAlignType }) => {
  if (!$align) return undefined

  return css`
    text-align: ${$align};
  `
}

const getLineHeight = ({ $lineHeight, $as }: { $lineHeight?: LineHeightType; $as: TypographyAsType }) => {
  // Use provided line height or determine default
  const effectiveLineHeight = $lineHeight || (isHeading($as) ? "condensed" : "base")

  return css`
    line-height: ${getReactToken("lineHeight", effectiveLineHeight).var};
  `
}

const getLineClamp = ({ $lineClamp }: { $lineClamp?: TypographyLineClampType }) => {
  if (!$lineClamp || $lineClamp === "none") return undefined

  return css`
    display: -webkit-box;
    -webkit-line-clamp: ${$lineClamp};
    -webkit-box-orient: vertical;
    overflow: hidden;
  `
}

const getWordBreak = ({ $wordBreak }: { $wordBreak?: TypographyWordBreakType }) => {
  if (!$wordBreak) return undefined

  return css`
    word-break: ${$wordBreak};
  `
}

export const StyledTypography = styled.p<{
  $as: TypographyAsType
  $size?: FontSizeType
  $weight?: FontWeightType
  $color?: ForegroundColorType
  $mode?: ModeType
  $antialiased?: boolean
  $legibilityOptimized?: boolean
  $align?: TypographyAlignType
  $lineHeight?: LineHeightType
  $lineClamp?: TypographyLineClampType
  $wordBreak?: TypographyWordBreakType
  $code?: boolean
}>`
  margin: 0;

  /* Font family with nice-styles fallback */
  ${getFontFamily}

  /* Color */
  ${getColor}

  /* Font size */
  ${getFontSize}

  /* Font weight */
  ${getFontWeight}

  /* Antialiasing */
  ${({ $antialiased }) => $antialiased && styleAntialiasing}

  /* Optimized legibility */
  ${({ $legibilityOptimized }) => $legibilityOptimized && styleOptimizedLegibility}

  /* Text alignment */
  ${getTextAlign}

  /* Line height with nice-styles fallback */
  ${getLineHeight}

  /* Line clamping for text truncation */
  ${getLineClamp}

  /* Word break behavior */
  ${getWordBreak}
`
