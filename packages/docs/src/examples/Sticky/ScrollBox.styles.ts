import styled from "styled-components"

/** The box's scrolling region: the rest of its height, scrolling vertically. */
export const ScrollRegion = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-block-size: 0;
  overflow-y: auto;
`
