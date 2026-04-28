import { css } from "styled-components"

export const styleHideScrollbar = css`
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`
