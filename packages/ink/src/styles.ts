/**
 * Styled Components for Typography
 *
 * This module contains the styled-components implementation for the Typography component.
 * It handles dynamic styling based on props and provides fallback values for CSS custom properties.
 *
 * @module styles
 */

import styled, { css } from "styled-components"
import { TypographyAsType, AlignType, LineHeightType } from "./types"
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
  $as: TypographyAsType
  $size?: string
  $sizeFallback?: string
  $weight?: string
  $weightFallback?: string
  $fontFamily?: string
  $fontFamilyFallback?: string
  $color?: string
  $antialiased?: boolean
  $legibilityOptimized?: boolean
  $align?: AlignType
  $lineHeight?: LineHeightType
  $code?: boolean
}>`
  margin: 0;

  ${({ $as, $fontFamily = "var(--font-family-heading)", $fontFamilyFallback = "inherit" }) =>
      ($as === "h1" || $as === "h2" || $as === "h3" || $as === "h4") &&
      css`
        font-family: ${$fontFamily};
        font-family: ${$fontFamilyFallback};
      `}

  ${({ $code }) =>
      $code &&
      css`
        font-family: "SF Mono", "Monaco", "Inconsolata", "Fira Code", monospace;
      `}

  ${({ $color }) =>
      $color &&
      css`
        color: ${$color};
      `}

  ${({ $as, $size, $sizeFallback }) => {
    // If user provided a size, use it directly
    if ($size) {
      return css`
        font-size: ${$size};
        font-size: ${$sizeFallback || $size};
      `
    }

    // Otherwise, use heading-specific defaults
    switch ($as) {
      case "h1":
        return css`
          font-size: var(--typography-size-h1);
          font-size: ${$sizeFallback || "3rem"};
        `
      case "h2":
        return css`
          font-size: var(--typography-size-h2);
          font-size: ${$sizeFallback || "2.25rem"};
        `
      case "h3":
        return css`
          font-size: var(--typography-size-h3);
          font-size: ${$sizeFallback || "1.875rem"};
        `
      case "h4":
        return css`
          font-size: var(--typography-size-h4);
          font-size: ${$sizeFallback || "1.5rem"};
        `
      default:
        return css`
          font-size: var(--typography-size-default);
          font-size: ${$sizeFallback || "1rem"};
        `
    }
  }}

  font-weight: ${({ $weight, $weightFallback = "normal" }) =>
    $weight || `var(--typography-weight-default, ${$weightFallback})`};

  ${({ $antialiased }) => $antialiased && styleAntialiasing}

  ${({ $legibilityOptimized }) => $legibilityOptimized && styleOptimizedLegibility}

  ${({ $align }) =>
      $align &&
      css`
        text-align: ${$align};
      `}

  ${({ $lineHeight }) =>
      $lineHeight &&
      css`
        line-height: var(--line-height-${$lineHeight}, normal);
      `}
`
