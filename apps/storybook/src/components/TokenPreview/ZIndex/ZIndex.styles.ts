import styled from "styled-components"
import { getToken, type TokenVariants } from "nice-react-styles"
import { REFERENCE_Z } from "./ZIndex.constants"

/** The stacking context both squares share — relative, so it mints one; neither child isolates. */
export const ZIndexStack = styled.div`
  position: relative;
  width: 72px;
  height: ${getToken("size", "large")};
`

/** The shared square: absolutely placed, base-sized, small-rounded. */
const ZIndexSquare = styled.div`
  position: absolute;
  width: ${getToken("size", "base")};
  height: ${getToken("size", "base")};
  border-radius: ${getToken("borderRadius", "small")};
`

/** The neutral reference layer, pinned at {@link REFERENCE_Z}. */
export const ZIndexReference = styled(ZIndexSquare)`
  top: 0;
  left: 0;
  z-index: ${REFERENCE_Z};
  background-color: ${getToken("backgroundColor", "raised")};
  border: 1px solid ${getToken("borderColor")};
`

/** The accent layer, carrying the row's zIndex token. */
export const ZIndexAccent = styled(ZIndexSquare)<{ $zIndex: TokenVariants["zIndex"] }>`
  top: ${getToken("gap", "small")};
  left: ${getToken("gap", "large")};
  z-index: ${({ $zIndex }) => getToken("zIndex", $zIndex)};
  background-color: ${getToken("color", "link")};
`
