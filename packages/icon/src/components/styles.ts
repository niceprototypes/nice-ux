import styled, { css, keyframes } from "styled-components"
import { getIconToken } from "../tokens/getIconToken"
import type { IconSizeType, IconColorType, IconStrokeWidthType } from "../types"

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

/**
 * Main icon wrapper component with all styling
 */
export const IconWrapperStyled = styled.div.withConfig({
  shouldForwardProp: (prop) => !String(prop).startsWith("$"),
})<{
  $color?: IconColorType
  $size?: IconSizeType
  $outlined?: boolean
  $strokeWidth?: IconStrokeWidthType
  $strokeScaling?: boolean
  $spinning?: boolean
}>`
  width: ${({ $size = "base" }) => getIconToken("size", $size).var};
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  img, svg {
    width: 100%;
    aspect-ratio: 1;
    ${({ $spinning }) => $spinning && css`
      animation: ${spin} ${getIconToken("spinningAnimationDuration").var} linear infinite;
    `}
  }

  svg {
    path, circle, rect, line, polyline, polygon, ellipse {
      ${({ $strokeScaling = false }) => !$strokeScaling && css`vector-effect: non-scaling-stroke;`}
      ${({ $outlined = false, $color = "base", $strokeWidth = "base" }) =>
          $outlined
              ? css`
                fill: ${getIconToken("color", $color).var};
                stroke: none;
              `
              : css`
                fill: none;
                stroke: ${getIconToken("color", $color).var};
                stroke-width: ${getIconToken("strokeWidth", $strokeWidth).var};
                stroke-linecap: round;
                stroke-linejoin: round;
              `}
    }
  }
`

/**
 * Styled image component for custom SVG URLs
 */
export const ImageStyled = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: contain;
`
