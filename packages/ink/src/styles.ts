import styled, { css } from "styled-components"
import { TypographyAsType, AlignType, LineHeightType } from "./types"
import { styleAntialiasing } from "./utils"

/**
 * CSS styles for optimized text legibility
 *
 * Applies hardware acceleration and 3D transform optimizations:
 * - Backface visibility for sharper text
 * - 3D perspective for improved rendering
 * - Transform hints for GPU acceleration
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

  font-size: ${({ $size = "var(--typography-size-default)", $sizeFallback = "1rem" }) => $size};
  font-size: ${({ $sizeFallback = "1rem" }) => $sizeFallback};

  font-weight: ${({ $weight = "var(--typography-weight-default)", $weightFallback = "normal" }) => $weight};
  font-weight: ${({ $weightFallback = "normal" }) => $weightFallback};

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
