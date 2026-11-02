import styled from "styled-components"
import Flex from "@niceprototypes/flex"
import { getToken } from "@niceprototypes/styles"

/** The theme's own surface, so a value reads on the background it was made for. */
export const ThemeValueFlex = styled(Flex).attrs({ direction: "column", gap: "smaller", padding: "small", grow: 1 })`
  background-color: ${getToken("backgroundColor")};
  border: ${getToken("borderWidth")} solid ${getToken("borderColor")};
  border-radius: ${getToken("borderRadius", "small")};
  min-width: 0;
`

/** The colour as a filled swatch; the subtle outline keeps a surface-coloured fill visible. */
export const SwatchDiv = styled.div<{ $color: string }>`
  height: ${getToken("size", "base")};
  background-color: ${({ $color }) => $color};
  border: ${getToken("borderWidth")} solid ${getToken("borderColor", "subtle")};
  border-radius: ${getToken("borderRadius", "small")};
`
