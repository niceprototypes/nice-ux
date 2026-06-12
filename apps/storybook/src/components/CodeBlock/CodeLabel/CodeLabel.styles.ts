import styled from "styled-components"
import { getToken } from "nice-react-styles"

/**
 * Language badge pinned to the top-right of a code block.
 *
 * Uses semantic tokens only (background/border/color), so it inverts on the
 * [data-theme="night"] pin via the cascade — no per-mode override needed.
 */
export const Pill = styled.span`
  padding: 0 ${getToken("gap", "smaller")};
  text-transform: uppercase;
  user-select: none;
  pointer-events: none;
`
