import styled, { css } from "styled-components"
import Flex from "nice-react-flex"
import { getReactToken } from "nice-react-styles"

export const OuterFlex = styled(Flex).withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{
  $backgroundImage?: string
  $backgroundColor?: string
  $foregroundColor?: string
  $backgroundPosition?: string
  $backgroundSize?: string
  $backgroundAttachment?: string
  $mode?: string
}>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: ${({ $mode }) => getReactToken("backgroundColor", "base", $mode).var};
  color: ${({ $mode }) => getReactToken("foregroundColor", "base", $mode).var};

  ${({ $backgroundColor }) => {
    if ($backgroundColor) {
      return css`
        background-color: ${$backgroundColor};
      `
    }
  }}

  ${({ $foregroundColor }) => {
    if ($foregroundColor) {
      return css`
        color: ${$foregroundColor};
      `
    }
  }}

  ${({ $backgroundImage, $backgroundPosition, $backgroundSize, $backgroundAttachment }) => {
    if ($backgroundImage) {
      return css`
        background-image: ${$backgroundImage};
        background-size: ${$backgroundSize || "cover"};
        background-position: ${$backgroundPosition || "center"};
        background-repeat: no-repeat;

        @media (orientation: landscape) {
          background-attachment: ${$backgroundAttachment || "fixed"};
        }
      `
    }
  }}
`
