import styled, { css } from "styled-components"
import Flex from "nice-react-flex"
import { getToken } from "nice-react-styles"
import type {
  BackgroundColorType,
  BackgroundSizeType,
  ForegroundColorType,
} from "nice-react-styles"

export const OuterFlex = styled(Flex).withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{
  $backgroundImage?: string
  $backgroundColor?: BackgroundColorType
  $foregroundColor?: ForegroundColorType
  $backgroundPosition?: string
  $backgroundSize?: BackgroundSizeType
  $backgroundAttachment?: string
}>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: ${getToken("backgroundColor", "base")};
  color: ${getToken("foregroundColor", "base")};

  ${({ $backgroundColor }) => {
    if ($backgroundColor) {
      return css`
        background-color: ${getToken("backgroundColor", $backgroundColor)};
      `
    }
  }}

  ${({ $foregroundColor }) => {
    if ($foregroundColor) {
      return css`
        color: ${getToken("foregroundColor", $foregroundColor)};
      `
    }
  }}

  ${({ $backgroundImage, $backgroundPosition, $backgroundSize, $backgroundAttachment }) => {
    if ($backgroundImage) {
      return css`
        background-image: ${$backgroundImage};
        background-size: ${$backgroundSize ? getToken("backgroundSize", $backgroundSize) : "cover"};
        background-position: ${$backgroundPosition || "center"};
        background-repeat: no-repeat;

        @media (orientation: landscape) {
          background-attachment: ${$backgroundAttachment || "fixed"};
        }
      `
    }
  }}
`
