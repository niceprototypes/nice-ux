import styled, { css, keyframes } from "styled-components"
import type { FontSizeType, BorderWidthType, ForegroundColorType } from "nice-styles"
import { getToken } from "nice-styles"

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
  $color?: ForegroundColorType
  $size?: FontSizeType
  $outlined?: boolean
  $strokeWidth?: BorderWidthType
  $strokeScaling?: boolean
  $spinning?: boolean
}>`
  width: ${({ $size = "base" }) => getToken("fontSize", $size).var};
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  img, svg {
    width: 100%;
    aspect-ratio: 1;
    ${({ $spinning }) => $spinning && css`
      animation: ${spin} 750ms linear infinite;
    `}
  }

  svg {
    path, circle, rect, line, polyline, polygon, ellipse {
      ${({ $strokeScaling = false }) => !$strokeScaling && css`vector-effect: non-scaling-stroke;`}
      ${({ $outlined = false, $color = "base", $strokeWidth = "base" }) =>
          $outlined
              ? css`
                fill: ${getToken("foregroundColor", $color).var};
                stroke: none;
              `
              : css`
                fill: none;
                stroke: ${getToken("foregroundColor", $color).var};
                stroke-width: ${getToken("borderWidth", $strokeWidth).var};
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
