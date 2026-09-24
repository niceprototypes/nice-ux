import styled from "styled-components"
import { getToken } from "nice-react-styles"
import type { SelectSizeType } from "./Select.types"

/**
 * Chevron holder in Input's `end` slot. Decorative: pointer events pass
 * through to the field chrome. The nested Icon is pinned to size "base" (so it
 * reads --np--icon--size), which is reassigned here to the select-scoped
 * `select.chevron.size` token at the select's own size — the Button pattern.
 */
export const StyledChevron = styled.span.withConfig({
  shouldForwardProp: prop => !prop.startsWith("$"),
})<{ $size: SelectSizeType }>`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  pointer-events: none;
  --np--icon--size: ${({ $size }) => getToken(`select.chevron.size:${$size}`)};
`
