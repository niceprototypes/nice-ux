import styled from "styled-components"
import Icon from "nice-react-icon"
import { getToken } from "nice-react-styles"

/** A standalone-icon preview sized to the `cellHeight larger` token. */
export const IconPreview = styled(Icon)`
  && {
    width: ${getToken("cellHeight", "base")};
    height: ${getToken("cellHeight", "base")};
  }
`