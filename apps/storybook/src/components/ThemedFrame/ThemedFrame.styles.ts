import styled from "styled-components"
import Button from "nice-react-button"
import { getToken } from "nice-react-styles"

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
  border: 1px solid ${({ $scrollable }) => ($scrollable ? getToken("borderColor") : "transparent")};
  border-radius: ${getToken("borderRadius")};
`

/**
 * The scroll gate. Clipped until activated: a frame wider than the docs column
 * would otherwise scroll as soon as the pointer crossed it, stealing wheel
 * events from the page.
 */
export const FrameScrollDiv = styled.div<{ $scrollable?: boolean }>`
  overflow: ${({ $scrollable }) => ($scrollable ? "auto" : "hidden")};
  border-radius: inherit;
`

/**
 * The frame itself. `display: block` drops the inline baseline gap an iframe
 * would otherwise leave under it, and the border lives on {@link FrameDiv}.
 */
export const FrameIframe = styled.iframe`
  display: block;
  border: 0;
`

/**
 * Full-bleed click target over the frame. The backdrop filter blurs the demo
 * underneath, so the frame reads as inert rather than as content the reader is
 * failing to interact with, and the label sits legibly on top of it.
 */
export const ThemedFrameToggle = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${getToken("gap", "smaller")};
  cursor: pointer;
  border-radius: inherit;
  backdrop-filter: blur(8px);
  background-color: ${getToken("backgroundColor", "raised", { inverse: true, transform: [null, null, null, 0.375] })};
`

/**
 * Locks the frame again once it is live. Sits in the top-right corner, over
 * the frame rather than beside it, so it costs no layout. Only positioning and a
 * surface are set here — Button owns its border, radius, sizing and states, and
 * renders square on its own from an icon with no children.
 */
export const ThemedFrameButton = styled(Button)`
  position: absolute;
  top: ${getToken("gap", "small")};
  right: ${getToken("gap", "small")};
  /* The frame shows through an unfilled Button, so it gets an opaque surface and
     a shadow to lift it off the demo underneath. */
  background-color: ${getToken("backgroundColor")};
  box-shadow: ${getToken("boxShadow")};
`
