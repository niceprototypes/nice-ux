import styled from "styled-components"
import { getToken } from "@niceprototypes/styles"

/**
 * Wraps the trigger element so the tooltip can attach handlers and measure its
 * position. `display: inline-block` keeps it sized to the children. Becomes a
 * pointer cursor when the trigger activates on click.
 */
export const TriggerWrapper = styled.span<{ $clickable: boolean }>`
  display: inline-block;
  ${({ $clickable }) => $clickable && `cursor: pointer;`}
`

/**
 * The tooltip bubble. Rendered in a portal at `<body>` and positioned with
 * `position: fixed` + inline coordinates, so it is never clipped by a scrolling
 * or overflow-hidden ancestor. Values come from the `tooltip.*` component
 * tokens; colours read their inverse dimension, so the bubble renders as the
 * opposite theme (a dark chip in day mode, light in night) and flips with the
 * cascade. `max-content` sizes it to its text, independent of where it is
 * placed; text longer than the max width wraps.
 */
export const Bubble = styled.div`
  position: fixed;
  z-index: ${getToken("tooltip.zIndex")};
  pointer-events: none;
  width: max-content;
  max-width: ${getToken("tooltip.maxWidth")};
  overflow-wrap: break-word;
  padding: ${getToken("tooltip.padding")};
  background-color: ${getToken("tooltip.backgroundColor", { inverse: true })};
  color: ${getToken("tooltip.color", { inverse: true })};
  border-radius: ${getToken("tooltip.borderRadius")};
  box-shadow: ${getToken("tooltip.boxShadow")};
  font-family: ${getToken("tooltip.fontFamily")};
  font-size: ${getToken("tooltip.fontSize")};
  line-height: ${getToken("tooltip.lineHeight")};
`
