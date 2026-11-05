import styled from "styled-components"
import { Scroll } from "@niceprototypes/scroll"
import { getToken } from "@niceprototypes/styles"

/** The scroll container: it takes the free height of a column and scrolls past it. */
export const StyledChatLog = styled(Scroll)`
  flex: 1 1 auto;
  min-block-size: 0;
`

/** The messages in a column, `chat.log.gap` apart. */
export const StyledChatLogMessages = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${getToken("chat.log.gap")};
`

/**
 * A zero-height bar stuck to the bottom of the view, `chat.log.gap` above it; the end button
 * rises out of it, so showing the button does not change the content height.
 */
export const StyledChatLogEnd = styled.div`
  position: sticky;
  inset-block-end: ${getToken("chat.log.gap")};
  block-size: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`
