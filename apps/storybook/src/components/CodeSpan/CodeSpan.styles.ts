import styled from "styled-components"

export const SpanCode = styled.code<{ $clickable?: boolean }>`
  ${({ $clickable }) => $clickable && `cursor: pointer;`}
`
