import styled from "styled-components"
import { getToken } from "@niceprototypes/styles"

// Anchor for the inner `--np--…` name of a `var()` reference — deep-links to the
// token's Modules story, styled with the link color and no underline. The
// surrounding `var(` / `)` render as plain text around it.
export const TokenVarLink = styled.a`
  color: ${getToken("color", "link")};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`
