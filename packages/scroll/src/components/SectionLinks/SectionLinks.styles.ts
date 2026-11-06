import styled from "styled-components"
import { getToken } from "@niceprototypes/styles"

export const LinksWrapper = styled.div`
  display: flex;
`

/** The link to the section in view reads the active colour. */
export const LinkAnchor = styled.a<{ $isActive: boolean }>`
  display: block;
  text-decoration: none;
  color: ${({ $isActive }) => getToken(`scroll.sectionLinks.color:${$isActive ? "active" : "base"}`)};
`

export const LinkInk = styled.span`
  display: inline-block;
`
