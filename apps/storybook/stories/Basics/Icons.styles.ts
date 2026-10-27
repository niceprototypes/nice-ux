import styled from "styled-components"
import Icon from "@niceprototypes/icon"
import { getToken } from "@niceprototypes/styles"

/** A standalone-icon preview sized to the `size larger` token. */
export const IconPreview = styled(Icon)`
  && {
    width: ${getToken("size", "base")};
    height: ${getToken("size", "base")};
  }
`