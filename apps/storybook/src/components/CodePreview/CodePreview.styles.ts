import styled from "styled-components"
import { getReactToken } from "nice-react-styles"
import Flex from "nice-react-flex"

export const ClickableDiv = styled.div<{ $clickable: boolean }>`
  width: 100%;
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};
  background-color: #1e1f22;

  &:hover {
    background-color: ${({ $clickable }) => $clickable && "black"};
  }
`

export const ClickableFlex = styled(Flex)`
  max-width: 100%;
  position: relative;
`
