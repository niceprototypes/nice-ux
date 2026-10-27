import styled from "styled-components"
import { getToken } from "@niceprototypes/styles"

/** Native `<fieldset>` with the UA border, padding and margin removed. */
export const StyledFieldset = styled.fieldset`
  border: 0;
  margin: 0;
  padding: 0;
  min-inline-size: 0;
`

/** Native `<legend>`; its text is rendered by Ink. */
export const StyledFieldsetLegend = styled.legend`
  padding: 0;
  margin-block-end: ${getToken("field.gap:label")};
`

/** Description container; carries the id referenced by `aria-describedby`. */
export const StyledFieldsetDescription = styled.div`
  margin-block-end: ${getToken("field.gap:description")};
`
