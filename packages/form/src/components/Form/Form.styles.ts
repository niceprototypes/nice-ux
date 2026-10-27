/**
 * Styled Components for Form
 *
 * Renders the semantic `<form>` root and stacks its direct children in a
 * vertical column. Form applies no spacing of its own — wrap children in a
 * `Flex` if you want a gap.
 *
 * @module styles
 */

import styled from "styled-components"

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`
