/**
 * Styled Components for Image
 *
 * Provides two rendering modes:
 * - StyledImg: Standard HTML img element with token-based styling
 * - StyledBackgroundImage: Div element with CSS background-image
 *
 * @module styles
 */

import styled, { css } from "styled-components"
import { getToken, type BorderRadiusType, type ModeType } from "nice-react-styles"
import type { ImageBackgroundSizeType, ImageBackgroundPositionType } from "./types"

/**
 * Maps ImageBackgroundSizeType to the equivalent CSS background-size value.
 * "fill" maps to "100% 100%" to stretch in both dimensions.
 * "scale-down" maps to "contain" as the closest background-size equivalent.
 * "none" maps to "auto" (none is not valid for CSS background-size).
 *
 * Used for the div rendering path only; the img path resolves object-fit via
 * the backgroundSize token directly, since CSS object-fit accepts every value.
 */
function backgroundSizeToCss(size: ImageBackgroundSizeType): string {
  switch (size) {
    case "fill":
      return "100% 100%"
    case "scale-down":
      return "contain"
    case "none":
      return "auto"
    default:
      return size
  }
}

const sharedStyles = css<{
  $width?: string
  $height?: string
  $borderRadius?: BorderRadiusType
  $mode?: ModeType
}>`
  display: block;

  /* Dimensions */
  ${({ $width }) => $width && css`width: ${$width};`}
  ${({ $height }) => $height && css`height: ${$height};`}

  /* Border radius from design tokens */
  ${({ $borderRadius, $mode }) =>
    $borderRadius &&
    css`
      border-radius: ${getToken("borderRadius", $borderRadius, $mode).var};
    `}
`

export const StyledImg = styled.img<{
  $width?: string
  $height?: string
  $backgroundSize?: ImageBackgroundSizeType
  $backgroundPosition?: ImageBackgroundPositionType
  $borderRadius?: BorderRadiusType
  $mode?: ModeType
}>`
  ${sharedStyles}

  /* Object fit from backgroundSize token */
  ${({ $backgroundSize, $mode }) =>
    $backgroundSize &&
    css`
      object-fit: ${getToken("backgroundSize", $backgroundSize, $mode).var};
    `}

  /* Object position derived from backgroundPosition */
  ${({ $backgroundPosition }) =>
    $backgroundPosition &&
    css`
      object-position: ${$backgroundPosition};
    `}
`

export const StyledBackgroundImage = styled.div<{
  $src: string
  $width?: string
  $height?: string
  $backgroundSize?: ImageBackgroundSizeType
  $backgroundPosition?: ImageBackgroundPositionType
  $borderRadius?: BorderRadiusType
  $mode?: ModeType
}>`
  ${sharedStyles}

  /* Background image from src prop */
  background-image: url(${({ $src }) => $src});
  background-repeat: no-repeat;

  /* Background size */
  ${({ $backgroundSize }) => css`
    background-size: ${$backgroundSize ? backgroundSizeToCss($backgroundSize) : "cover"};
  `}

  /* Background position */
  ${({ $backgroundPosition }) => css`
    background-position: ${$backgroundPosition || "center"};
  `}
`
