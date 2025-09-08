import styled, { css } from "styled-components"
import { TypographyAsType } from "./types"
import { getCssVariable, styleAntialiasing } from "./utils"

export const styleOptimizedLegibility = css`
  backface-visibility: hidden;
  perspective: 1000px;
  transform-style: preserve-3d;
  will-change: transform;
`

export const StyledTypography = styled.p<{
  $as: TypographyAsType
  $size?: number
  $weight?: number
  $color?: string
  $antialiased?: boolean
  $legibilityOptimized?: boolean
  $align?: "left" | "center" | "right" | "justify"
  $lineHeight?: "default" | "condensed"
  $code?: boolean
}>`
  margin: 0;

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

  ${({ $as, $size }) => {
    // Determine default size based on element type
    const defaultSize = $as === "h1" ? 5 : $as === "h2" ? 4 : $as === "h3" ? 3 : 3
    const actualSize = $size || defaultSize

    return css`
      font-size: ${getCssVariable("font-size", actualSize)};
    `
  }}

  ${({ $weight }) =>
    $weight &&
    css`
      font-weight: var(--font-weight-${$weight});
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
