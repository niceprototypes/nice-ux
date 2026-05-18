import styled from "styled-components"
import { getToken } from "nice-react-styles"
import Flex, { FlexProps } from "nice-react-flex"
import Typography, { TypographyProps } from "../../../nice/Typography"

export const colors = {
  copying: "hsla(93, 100%, 63%, 1)",
}

export const CopyingFlex = styled(Flex)<FlexProps>`
  background-color: hsla(220, 5%, 15%, 1);
  border-radius: ${getToken("borderRadius", "base")};
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  cursor: default;
`

export const StyledTypography = styled(Typography)<TypographyProps>`
  max-width: 100%;

  span {
    max-width: 100%;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`
