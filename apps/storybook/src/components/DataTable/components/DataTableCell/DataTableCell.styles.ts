import styled from "styled-components"
import Flex from "nice-react-flex"
import { getBreakpoint } from "nice-react-styles"

/**
 * Copyable-cell affordance: an inline-flex row (via Flex's `inline` prop) holding
 * the value beside a small copy icon (rendered in the "lightest" color). Hovering
 * recolors the stroke-drawn icon to the link color to signal the click-to-copy
 * action — replaces the former hover "Copy to clipboard" tooltip.
 */
export const CopyAffordance = styled(Flex).attrs({
  inline: true,
  alignItems: "center",
  gap: "small",
})`
  cursor: pointer;

  /* The column stretches its child to 100% (Column > * { width: 100% }) and the
     copyable node carries its own flex-grow (CodeBlock fills its card), which
     together push the icon to the column edge. Pin the node to hug its content so
     the icon sits immediately beside the text. */
  > *:first-child {
    flex: 0 1 auto;
    min-width: 0;
  }

  /* Only the trailing copy icon fades in on hover. Scope to the last child so a
     wrapped node's own svg (e.g. TokenName's "Default" check) is never hidden. */
  ${getBreakpoint("tablet+")} {
    > *:last-child {
      opacity: 0;
    }

    &:hover > *:last-child {
      opacity: 1;
    }
  }
`