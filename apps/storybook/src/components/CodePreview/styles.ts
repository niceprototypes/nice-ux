import styled from "styled-components"
import { getToken } from "nice-styles"
import Flex from "nice-react-flex"

export const ClickableDiv = styled.div<{ $clickable: boolean }>`
  width: 100%;
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};
  background-color: #1E1F22;
  border-radius: ${getToken("borderRadius", "smaller").var};
  
  &:hover {
    background-color: ${({ $clickable }) => ($clickable && "black")};
  }
`

export const ClickableFlex = styled(Flex)`
  max-width: 100%;
  position: relative;
`