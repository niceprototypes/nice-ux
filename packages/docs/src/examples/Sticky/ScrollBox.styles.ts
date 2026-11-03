import styled from "styled-components"
import { Scroll } from "@niceprototypes/scroll"

/** The box's scrolling region: the rest of its height, scrolling vertically. */
export const ScrollRegion = styled(Scroll)`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-block-size: 0;
`
