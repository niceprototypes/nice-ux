import styled from "styled-components"
import { getToken } from "@niceprototypes/styles"
import { Scroll } from "@niceprototypes/scroll"

/**
 * Positioning context for the overlay and the lock button.
 *
 * Deliberately not the scroll container: an absolutely-positioned child of a
 * scrolling box is placed against its padding box and scrolls away with the
 * content, so the button would slide off. Scrolling lives on {@link FrameScrollDiv}
 * inside, leaving this box fixed for anything pinned to a corner.
 *
 * `width: fit-content` keeps it on the iframe rather than stretching to the docs
 * column, so the overlay covers the frame and nothing else.
 */
export const FrameDiv = styled.div<{ $scrollable?: boolean }>`
  position: relative;
  width: fit-content;
  max-width: 100%;
  border: 1px solid
    ${({ $scrollable }) =>
      $scrollable ? getToken("borderColor") : "transparent"};
  border-radius: ${getToken("borderRadius")};
`

/**
 * The scroll gate. Clipped until activated: a frame wider than the docs column
 * would otherwise scroll as soon as the pointer crossed it, stealing wheel
 * events from the page.
 */
export const FrameScrollDiv = styled(Scroll).attrs({ axis: "both" })<{ $scrollable?: boolean }>`
  ${({ $scrollable }) => !$scrollable && "overflow: hidden;"}
  border-radius: inherit;
`

/**
 * The frame itself. `display: block` drops the inline baseline gap an iframe
 * would otherwise leave under it, and the border lives on {@link FrameDiv}.
 */
export const FrameIframe = styled.iframe<{ $locked: boolean }>`
  display: block;
  border: 0;
  /* Locked, the frame takes no pointer input: the iframe's own document would scroll under
     wheel and touch otherwise, whatever its container clips, so they reach the page instead. */
  ${({ $locked }) => $locked && "pointer-events: none;"}
`

/** Holds the lock toggle in the frame's bottom-right corner, over the demo, one gap in. */
export const ThemedFrameControl = styled.div`
  position: absolute;
  right: ${getToken("gap")};
  bottom: ${getToken("gap")};
`
