import styled from "styled-components"

// Inline-block so the clickable area hugs its content rather than spanning the
// column. A div (not a span) keeps it valid around a block child like a
// Typography <p>.
export const ClickToCopyWrapper = styled.div`
  display: inline-block;
  cursor: pointer;
`
