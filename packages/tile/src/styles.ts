import styled, { css } from "styled-components"
import Flex from "nice-react-flex"
import { getTileToken } from "./tokens"

export const OuterStyled = styled(Flex).withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{
  $backgroundImage?: string
  $backgroundColor?: string
  $foregroundColor?: string
  $backgroundPosition?: string
  $backgroundSize?: string
  $backgroundAttachment?: string
}>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: ${getTileToken("backgroundColor").var};
  color: ${getTileToken("foregroundColor").var};

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

export const InnerStyled = styled(Flex).withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{
  $maxWidthTablet?: number
  $maxWidthDesktop?: number
}>`
  margin: 0 auto;
  width: 100%;

  ${({ $maxWidthTablet }) => $maxWidthTablet && css`
    @media (min-width: ${$maxWidthTablet}px) {
      width: ${$maxWidthTablet}px;
    }
  `}

  ${({ $maxWidthDesktop }) => $maxWidthDesktop && css`
    @media (min-width: ${$maxWidthDesktop}px) {
      width: ${$maxWidthDesktop}px;
    }
  `}
`