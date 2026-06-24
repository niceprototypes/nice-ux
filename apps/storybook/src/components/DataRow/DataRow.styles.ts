import styled from "styled-components"

// Hoisted full-width preview wrapper (the `fullWidth` row's first value).
export const PreviewWrapper = styled.div<{ $fullWidth?: boolean }>`
  ${({ $fullWidth }) => $fullWidth && `width: 100%;`}
`
