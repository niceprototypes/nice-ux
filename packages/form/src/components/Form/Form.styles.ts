/**
 * Styled Components for Form
 *
 * Renders the semantic `<form>` root and lays out its direct children as a
 * vertical flex stack. Spacing is driven by the `gap` design token so field
 * rhythm matches the rest of the Nice system.
 *
 * @module styles
 */

import styled from "styled-components"
import { getToken, type GapType } from "nice-react-styles"

export const StyledForm = styled.form<{ $gap: GapType }>`
  display: flex;
  flex-direction: column;

  /* Token-based vertical rhythm between fields */
  gap: ${({ $gap }) => getToken("gap", $gap)};
`
