import styled, { css } from "styled-components"
import type { FontSizeType, BorderWidthType, ForegroundColorType } from "nice-styles"
import { getToken } from "nice-styles"
import { IconType } from "../types"

/**
 * Main icon wrapper component with all styling
 */
export const IconWrapperStyled = styled.div.withConfig({
  shouldForwardProp: (prop) => !String(prop).startsWith("$"),
})<{
  $color?: ForegroundColorType
  $size?: FontSizeType
  $type?: IconType
  $strokeWidth?: BorderWidthType
}>`
  width: ${({ $size = "base" }) => getToken("fontSize", $size).var};
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  img, svg {
    width: 100%;
    aspect-ratio: 1;
  }

  svg {
    path, circle, rect, line, polyline, polygon, ellipse {
      ${({ $type, $color = "base", $strokeWidth = "base" }) =>
          $type === "stroke"
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