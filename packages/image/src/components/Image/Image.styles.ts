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
import { getToken, resolveColorProp, type BorderRadiusType, type BorderWidthType, type BorderColorType, type ColorTokenProp } from "@niceprototypes/styles"
import type { ImageBackgroundSizeType, ImageBackgroundPositionType } from "./Image.types"
import { backgroundSizeToCss } from "../../utilities/backgroundSizeToCss"

const sharedStyles = css<{
  $width?: string
  $height?: string
  $aspectRatio?: string
  $borderRadius?: BorderRadiusType
  $bordered?: boolean
  $borderWidth?: BorderWidthType
  $borderColor?: ColorTokenProp<BorderColorType>
}>`
  display: block;

  /* Dimensions */
  ${({ $width }) => $width && css`width: ${$width};`}
  ${({ $height }) => $height && css`height: ${$height};`}
  ${({ $aspectRatio }) => $aspectRatio && css`aspect-ratio: ${$aspectRatio};`}

  /* Border radius from design tokens */
  ${({ $borderRadius }) =>
    $borderRadius &&
    css`
      border-radius: ${getToken(`image.borderRadius:${$borderRadius}`)};
    `}

  /* Border from design tokens (gated by $bordered) */
  ${({ $bordered, $borderWidth = "base", $borderColor = "base" }) =>
    $bordered &&
    css`
      border: ${getToken(`image.borderWidth:${$borderWidth}`)} solid ${resolveColorProp("image", "borderColor", $borderColor)};
    `}
`

export const StyledImg = styled.img<{
  $width?: string
  $height?: string
  $aspectRatio?: string
  $backgroundSize?: ImageBackgroundSizeType
  $backgroundPosition?: ImageBackgroundPositionType
  $borderRadius?: BorderRadiusType
  $bordered?: boolean
  $borderWidth?: BorderWidthType
  $borderColor?: ColorTokenProp<BorderColorType>
}>`
  ${sharedStyles}

  /* Object fit from backgroundSize token */
  ${({ $backgroundSize }) =>
    $backgroundSize &&
    css`
      object-fit: ${getToken(`image.backgroundSize:${$backgroundSize}`)};
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
  $aspectRatio?: string
  $backgroundSize?: ImageBackgroundSizeType
  $backgroundPosition?: ImageBackgroundPositionType
  $borderRadius?: BorderRadiusType
  $bordered?: boolean
  $borderWidth?: BorderWidthType
  $borderColor?: ColorTokenProp<BorderColorType>
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
