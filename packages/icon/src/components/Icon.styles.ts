import styled, { keyframes, css } from "styled-components"
import type { FontSizeType, BorderWidthType, ForegroundColorType } from "nice-styles"
import { getToken } from "nice-styles"
import { IconVariant } from "../types"

/**
 * Rotation animation for spinning icons
 */
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

/**
 * Wrapper for spinning content
 */
export const SpinnerWrapper = styled.div<{
  $spinning?: boolean
}>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ $spinning }) =>
    $spinning &&
    css`
      animation: ${rotate} 1s linear infinite;
    `}
`

/**
 * Main icon wrapper component with all styling
 */
export const IconWrapperStyled = styled.div.withConfig({
  shouldForwardProp: (prop) => !String(prop).startsWith("$"),
})<{
  $color?: ForegroundColorType
  $backgroundColor?: string
  $size?: FontSizeType
  $borderRadius?: number
  $imageSize?: string
  $rotation?: number
  $variant?: IconVariant
  $strokeWidth?: BorderWidthType
}>`
  width: ${({ $size = "base" }) => getToken("fontSize", $size).var};
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ $backgroundColor }) =>
      $backgroundColor ? `${$backgroundColor}` : "transparent"};
  border-radius: ${({ $borderRadius }) =>
      $borderRadius ? `var(--border-radius-${$borderRadius})` : "0"};
  transition: background-color var(--animation-duration-1, 0.2s) var(--animation-easing-1, ease);

  ${({ $rotation = 0 }) => ($rotation !== 0 ? `transform: rotate(${$rotation}deg);` : "")}

  img, svg {
    width: ${({ $imageSize }) => $imageSize};
    aspect-ratio: 1;  
  }

  svg {
    path, circle, rect {
      ${({ $variant, $color = "base", $strokeWidth = "base" }) =>
          $variant === "stroke"
              ? css`
                fill: none;
                stroke: ${getToken("foregroundColor", $color).var};
                stroke-width: ${getToken("borderWidth", $strokeWidth).var};
                stroke-linecap: round;
                stroke-linejoin: round;
              `
              : css`
                fill: ${getToken("foregroundColor", $color).var};
                stroke: none;
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