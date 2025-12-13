/**
 * Styled Components for Typography
 *
 * This module contains the styled-components implementation for the Typography component.
 * It handles dynamic styling based on props and provides fallback values for CSS custom properties.
 *
 * @module styles
 */

import styled, { css } from "styled-components"
import type { ForegroundColorType, FontSizeType, FontWeightType, LineHeightType } from "nice-styles"
import { getToken } from "nice-react-styles"
import { AsType, AlignType } from "./types"
import { styleAntialiasing } from "./utils"

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
  $as: AsType
  $size?: FontSizeType
  $weight?: FontWeightType
  $color?: ForegroundColorType
  $antialiased?: boolean
  $legibilityOptimized?: boolean
  $align?: AlignType
  $lineHeight?: LineHeightType
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
  ${({ $color }) => {
    if (!$color) return ''

    return css`
      color: ${getToken("foregroundColor", $color).var};
    `
  }}

  /* Font size */
  ${({ $as, $size }) => {
    // Determine effective font size
    let effectiveSize: FontSizeType

    if ($size) {
      effectiveSize = $size
    } else {
      // Default sizes for headings
      switch ($as) {
        case "h1":
          effectiveSize = "larger"
          break
        case "h2":
          effectiveSize = "large"
          break
        default:
          effectiveSize = "base"
      }
    }

    return css`
      font-size: ${getToken("fontSize", effectiveSize).var};
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
`
