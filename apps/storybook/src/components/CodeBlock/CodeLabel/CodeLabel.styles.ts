import styled from "styled-components"
import { getToken } from "nice-react-styles"

/**
 * Language badge pinned to the top-right of a code block.
 *
 * Uses semantic tokens only (background/border/color), so it inverts on the
 * [data-theme="night"] pin via the cascade — no per-mode override needed.
 */
export const Pill = styled.span<{ $fit?: boolean }>`
  padding: 0 ${getToken("gap", "smaller")};
  top: ${getToken("gap")};
  background-color: ${getToken("backgroundColor")};
  border-radius: ${getToken("borderRadius", "small")};
  right: ${getToken("gap")};
  text-transform: uppercase;
  user-select: none;
  pointer-events: none;
  /* fit: the card is content-sized, so the pill sits in flow rather than pinned. */
  ${({ $fit }) => $fit && `position: static; top: auto; right: auto;`}
`
