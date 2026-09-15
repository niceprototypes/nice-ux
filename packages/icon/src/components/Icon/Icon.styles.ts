import styled, { css, keyframes } from "styled-components"
import { getToken } from "nice-react-styles"
import type {
  IconSizeType,
  IconColorType,
  IconStrokeWidthType,
  IconVariantType,
  IconAnimationType,
  IconAnimationDurationType,
} from "./Icon.types"

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
  $variant?: IconVariantType
  $strokeWidth?: IconStrokeWidthType
  $strokeScaling?: boolean
  $animation?: IconAnimationType
  $animationDuration?: IconAnimationDurationType
}>`
  width: ${({ $size = "base" }) => getToken("size", $size, { prefix: "icon" })};
  height: ${({ $size = "base" }) => getToken("size", $size, { prefix: "icon" })};
  color: ${({ $color = "base" }) => getToken("color", $color, { prefix: "icon" })};
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;

  img, svg {
    width: 100%;
    height: 100%;
    ${({ $animation, $animationDuration = "base" }) => $animation === "spin" && css`
      animation: ${spin} ${getToken("animationDuration", $animationDuration, { prefix: "icon" })} linear infinite;
    `}
  }

  svg {
    path, circle, rect, line, polyline, polygon, ellipse {
      ${({ $strokeScaling = false }) => !$strokeScaling && css`vector-effect: non-scaling-stroke;`}
      ${({ $variant = "base", $color = "base", $strokeWidth = "base" }) => {
          if ($variant === "fill")
            return css`
              fill: ${getToken("color", $color, { prefix: "icon" })};
              stroke: none;
            `
          if ($variant === "base")
            return css`
              fill: none;
              stroke: ${getToken("color", $color, { prefix: "icon" })};
              stroke-width: ${getToken("strokeWidth", $strokeWidth, { prefix: "icon" })};
              stroke-linecap: round;
              stroke-linejoin: round;
            `
          // Custom variants (e.g. "3d") keep the fill/stroke authored in the SVG.
          return ""
        }}
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