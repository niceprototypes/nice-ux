import styled from "styled-components"

export const PreviewWrapper = styled.div<{ $width?: string }>`
  ${({ $width }) => ($width ? `width: ${$width};` : "")}
`
