import styled from "styled-components"
import { getToken } from "nice-react-styles"

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
 * or overflow-hidden ancestor. Colors use the inverse dimension of the color /
 * background-color tokens, so the bubble renders as the opposite theme (a dark
 * chip in day mode, light in night) and flips automatically with the cascade.
 */
export const Bubble = styled.div`
  position: fixed;
  z-index: 2147483647;
  pointer-events: none;
  white-space: nowrap;
  max-width: 20em;
  padding: ${getToken("gap", "small")} ${getToken("gap")};
  background-color: ${getToken("backgroundColor", "base", { inverse: true })};
  color: ${getToken("color", undefined, { inverse: true })};
  border-radius: ${getToken("borderRadius", "small")};
  box-shadow: ${getToken("boxShadow", "base")};
  font-family: ${getToken("fontFamily", "base")};
  font-size: ${getToken("fontSize", "small")};
  line-height: ${getToken("lineHeight", "base")};
`
