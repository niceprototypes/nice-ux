/**
 * Styled Components for Typography
 *
 * This module contains the styled-components implementation for the Typography component.
 * It handles dynamic styling based on props and provides fallback values for CSS custom properties.
 *
 * @module styles
 */

import styled, { css } from "styled-components"
import type { ForegroundColorType, FontSizeType, FontWeightType, LineHeightType, ModeType } from "nice-styles"
import { getToken } from "nice-react-styles"
import { TypographyAsType, TypographyAlignType, TypographyLineClampType, TypographyWordBreakType } from "./types"
import { styleAntialiasing } from "./helpers/styleAntialiasing"

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
  ${({ $as, $code }) => {
    if ($code) {
      return css`
        font-family: ${getToken("fontFamily", "code").var};
      `
    }

    if ($as === "h1" || $as === "h2" || $as === "h3" || $as === "h4") {
      return css`
        font-family: ${getToken("fontFamily", "heading").var};
      `
    }

    return css`
      font-family: ${getToken("fontFamily", "base").var};
    `
  }}

  /* Color */
  ${({ $color, $mode }) => {
    if (!$color) return css`color: inherit;`

    return css`
      color: ${getToken("foregroundColor", $color, $mode).var};
    `
  }}

  /* Font size */
  ${({ $as, $size }) => {
    // Determine effective font size
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
        default:
          effectiveFontSize = "base"
      }
    }

    return css`
      font-size: ${getToken("fontSize", effectiveFontSize).var};
    `
  }}

  /* Font weight */
  ${({ $as, $weight }) => {
    if ($weight) {
      return css`
        font-weight: ${getToken("fontWeight", $weight).var};
      `
    }

    // Default weights for headings
    if ($as === "h1" || $as === "h2" || $as === "h3") {
      return css`
        font-weight: ${getToken("fontWeight", "bold").var};
      `
    }
  }}

  /* Antialiasing */
  ${({ $antialiased }) => $antialiased && styleAntialiasing}

  /* Optimized legibility */
  ${({ $legibilityOptimized }) => $legibilityOptimized && styleOptimizedLegibility}

  /* Text alignment */
  ${({ $align }) =>
      $align &&
      css`
        text-align: ${$align};
      `}

  /* Line height with nice-styles fallback */
  ${({ $lineHeight, $as }) => {
    // Use provided line height or determine default
    const effectiveLineHeight = $lineHeight ||
      (($as === "h1" || $as === "h2" || $as === "h3" || $as === "h4") ? "condensed" : "base")

    return css`
      line-height: ${getToken("lineHeight", effectiveLineHeight).var};
    `
  }}

  /* Line clamping for text truncation */
  ${({ $lineClamp }) => {
    if (!$lineClamp || $lineClamp === "none") return ""

    return css`
      display: -webkit-box;
      -webkit-line-clamp: ${$lineClamp};
      -webkit-box-orient: vertical;
      overflow: hidden;
    `
  }}

  /* Word break behavior */
  ${({ $wordBreak }) =>
    $wordBreak &&
    css`
      word-break: ${$wordBreak};
    `}
`
