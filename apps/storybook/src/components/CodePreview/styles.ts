import styled from "styled-components"
import { getToken } from "nice-styles"
import Flex from "nice-react-flex"

export const colors = {
  background: "hsla(220, 5%, 12%, 1)",
  markup: "hsl(46,100%,50%)",
  element: "hsla(198, 100%, 64%, 1)",
  script: "hsl(278,100%,79%)",
  value: "hsla(0, 100%, 100%, 1)",
  children: "hsla(0, 100%, 100%, 0.50)",
  copying: "hsla(93, 100%, 63%, 1)",
}

export const ClickableDiv = styled.div<{ $clickable: boolean }>`
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};
`

export const CodeFlex = styled(Flex)`
  max-width: 100%;
  background-color: ${colors.background};
  padding: 0.5rem 0.625rem;
  border-radius: ${getToken("borderRadius", "base").var};
  position: relative;
  transition: background-color 0.1s ease-in-out;
`
