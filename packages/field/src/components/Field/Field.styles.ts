import styled from "styled-components"
import { getToken } from "nice-react-styles"

/**
 * Field root. Stacks label → control → description → error; the spacing
 * between them comes from the `field.gap:*` component tokens.
 */
export const StyledField = styled.div`
  display: flex;
  flex-direction: column;
  min-inline-size: 0;
`

/** Native `<label>`; its text is rendered by Ink. */
export const StyledFieldLabel = styled.label`
  display: block;
  margin-block-end: ${getToken("field.gap:label")};
`

/** Description container; carries the id referenced by `describedBy`. */
export const StyledFieldDescription = styled.div`
  margin-block-start: ${getToken("field.gap:description")};
`

/** Error container; a polite live region carrying the error id. */
export const StyledFieldError = styled.div`
  margin-block-start: ${getToken("field.gap:error")};
`
