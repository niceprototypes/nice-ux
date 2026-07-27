import styled from "styled-components"
import Icon from "nice-react-icon"
import { getToken } from "nice-react-styles"

/** A standalone-icon preview sized to the `size larger` token. */
export const IconPreview = styled(Icon)`
  && {
    width: ${getToken("size", "base")};
    height: ${getToken("size", "base")};
  }
`