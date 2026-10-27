import styled from "styled-components"
import Flex from "@niceprototypes/flex"
import { getBreakpoint } from "@niceprototypes/styles"

/**
 * Click-hint affordance: an inline-flex row (via Flex's `inlined` prop) holding
 * the content beside a small hint icon (rendered in the "lightest" color).
 * Hovering (tablet+) fades the trailing icon in to signal the element is
 * interactive — the generic form of the former copy-only affordance, with the
 * icon chosen by the caller.
 */
export const ClickHintWrapper = styled(Flex).attrs({
  inlined: true,
  alignItems: "center",
  gap: "small",
})`
  cursor: pointer;

  /* Surrounding columns stretch their child to 100% and copyable nodes carry
     their own flex-grow (CodeBlock fills its card), which together push the icon
     to the column edge. Pin the content to hug itself so the icon sits
     immediately beside it. */
  > *:first-child {
    flex: 0 1 auto;
    min-width: 0;
  }

  /* Only the trailing hint icon fades in on hover. Scope to the last child so a
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
