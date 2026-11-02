import styled from "styled-components"
import { getToken } from "../../tokens"

/** The page's content; its headings scroll to where Contents sticks, like sections. */
export const StyledMdxContent = styled.div`
  h2[id],
  h3[id] {
    scroll-margin-top: ${getToken("contents.top")};
  }
`
