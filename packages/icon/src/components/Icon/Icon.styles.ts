import styled, { css, keyframes } from "styled-components"
import { getIconToken } from "../../tokens/getIconToken"
import { getReactToken, type ModeType } from "nice-react-styles"
import type { IconSizeType, IconColorType, IconStrokeWidthType } from "./Icon.types"

// Helper — calls getReactToken with optional mode
const getColorToken = (color: string, mode?: ModeType) =>
  mode ? getReactToken("foregroundColor", color, mode) : getReactToken("foregroundColor", color)

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
  $mode?: ModeType
}>`
  width: ${({ $size = "base" }) => getIconToken("size", $size)};
  height: ${({ $size = "base" }) => getIconToken("size", $size)};
  color: ${({ $color = "base", $mode }) => getColorToken($color, $mode)};
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;

  img, svg {
    width: 100%;
    height: 100%;
    ${({ $spinning }) => $spinning && css`
      animation: ${spin} ${getIconToken("spinningAnimationDuration")} linear infinite;
    `}
  }

  svg {
    path, circle, rect, line, polyline, polygon, ellipse {
      ${({ $strokeScaling = false }) => !$strokeScaling && css`vector-effect: non-scaling-stroke;`}
      ${({ $outlined = false, $color = "base", $strokeWidth = "base", $mode }) =>
          $outlined
              ? css`
                fill: ${getColorToken($color, $mode)};
                stroke: none;
              `
              : css`
                fill: none;
                stroke: ${getColorToken($color, $mode)};
                stroke-width: ${getIconToken("strokeWidth", $strokeWidth)};
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