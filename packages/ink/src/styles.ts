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
  $weight?: string
  $color?: string
  $antialiased?: boolean
  $legibilityOptimized?: boolean
  $align?: AlignType
  $lineHeight?: LineHeightType
  $code?: boolean
}>`
  margin: 0;

  ${({ $as }) =>
      ($as === "h1" || $as === "h2" || $as === "h3" || $as === "h4") &&
      css`
        font-family: var(--font-family-heading);
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

  ${({ $size }) =>
      $size
          ? css`
            font-size: ${$size};
          `
          : css`
            font-size: var(--typography-size-default, 1rem);
          `}

  ${({ $weight }) =>
      $weight
          ? css`
            font-weight: ${$weight};
          `
          : css`
            font-weight: var(--typography-weight-default, normal);
          `}

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
        line-height: var(--line-height-${$lineHeight});
      `}
`
