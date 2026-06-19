import styled, { css } from "styled-components"
import Flex from "nice-react-flex"
import { getToken } from "nice-react-styles"
import type {
  BackgroundColorType,
  BackgroundSizeType,
  ColorType,
} from "nice-react-styles"

export const OuterFlex = styled(Flex).withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{
  $backgroundImage?: string
  $backgroundColor?: BackgroundColorType
  $color?: ColorType
  $backgroundPosition?: string
  $backgroundSize?: BackgroundSizeType
  $backgroundAttachment?: string
  $minWidth?: string
  $minHeight?: string
  $maxHeight?: string
}>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: ${getToken("backgroundColor", { variant: "base" })};
  color: ${getToken("color", { variant: "base" })};

  ${({ $minWidth }) => $minWidth && css`min-width: ${$minWidth};`}
  ${({ $minHeight }) => $minHeight && css`min-height: ${$minHeight};`}
  ${({ $maxHeight }) => $maxHeight && css`max-height: ${$maxHeight};`}

  ${({ $backgroundColor }) => {
    if ($backgroundColor) {
      return css`
        background-color: ${getToken("backgroundColor", { variant: $backgroundColor })};
      `
    }
  }}

  ${({ $color }) => {
    if ($color) {
      return css`
        color: ${getToken("color", { variant: $color })};
      `
    }
  }}

  ${({ $backgroundImage, $backgroundPosition, $backgroundSize, $backgroundAttachment }) => {
    if ($backgroundImage) {
      return css`
        background-image: ${$backgroundImage};
        background-size: ${$backgroundSize ? getToken("backgroundSize", { variant: $backgroundSize }) : "cover"};
        background-position: ${$backgroundPosition || "center"};
        background-repeat: no-repeat;

        @media (orientation: landscape) {
          background-attachment: ${$backgroundAttachment || "fixed"};
        }
      `
    }
  }}
`
