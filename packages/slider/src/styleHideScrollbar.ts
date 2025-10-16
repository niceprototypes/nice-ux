import { css } from "styled-components"

const styleHideScrollbar = css`
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`
export default styleHideScrollbar
