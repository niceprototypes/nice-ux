import styled from "styled-components"

export const ClipCode = styled.code<{ $clickable?: boolean }>`
  ${({ $clickable }) => $clickable && `cursor: pointer;`}
`
