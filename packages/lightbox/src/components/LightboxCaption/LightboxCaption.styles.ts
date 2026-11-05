import styled from "styled-components"
import { getToken } from "@niceprototypes/styles"

export const Wrapper = styled.div`
  max-width: ${getToken("lightbox.caption.maxWidth:base")};
  padding: ${getToken("lightbox.caption.padding:base")};
  text-align: center;
`
