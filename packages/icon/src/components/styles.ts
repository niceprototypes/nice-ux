import styled, { keyframes, css } from "styled-components"
import { getCssVariable, styleFunctionalColor } from "../utils"

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const IconWrapperStyled = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith("$"),
})<{
  $color?: string
  $backgroundColor?: string
  $size?: number
  $borderRadius?: number
  $imageSize?: string
  $spinning?: boolean
  $rotation?: number
  $variant?: "fill" | "stroke"
  $strokeWidth?: 1 | 2
}>`
  width: var(--cell-height-${({ $size }) => $size});
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ $backgroundColor }) =>
    $backgroundColor ? `${$backgroundColor}` : "transparent"};
  border-radius: ${({ $borderRadius }) =>
    $borderRadius ? `var(--border-radius-${$borderRadius})` : "0"};
  transition: background-color var(--animation-duration-1) var(--animation-easing-1);
  ${({ $rotation = 0 }) => ($rotation !== 0 ? `transform: rotate(${$rotation}deg);` : "")}

  svg {
    width: ${({ $imageSize }) => $imageSize};
    aspect-ratio: 1;
    ${({ $spinning }) =>
      $spinning &&
      css`
        animation: ${rotate} 1s linear infinite;
      `}

    path, circle, rect {
      ${({ $variant, $color, $strokeWidth = 1 }) =>
        $variant === "stroke"
          ? css`
              fill: none;
              ${styleFunctionalColor($color!, "stroke")}
              stroke-width: ${getCssVariable("icon-stroke-width", $strokeWidth)}; //TODO
              stroke-linecap: round;
              stroke-linejoin: round;
            `
          : css`
              ${styleFunctionalColor($color!, "color")}
              stroke: none;
            `}
    }
  }
`

export const IconSvgStyled = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: contain;
`
