import styled from "styled-components"

export const TitleAnchor = styled.a.attrs({
  target: "_top",
})`
    line-height: inherit !important;
    text-decoration: none !important;
  span {
    color: inherit;
  }
`

export const DescriptionAnchor = styled.a.attrs({
  target: "_top",
})`
  color: inherit !important;
  line-height: inherit !important;
    text-decoration: none !important;
  span {
    color: inherit;
  }
`
