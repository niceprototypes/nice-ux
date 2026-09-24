import styled from "styled-components"

/**
 * Calendar trigger in Input's `end` slot. A bare native button: no chrome of
 * its own, colour inherited from the field. It keeps `outline: none` because
 * Input's chrome draws the keyboard focus ring for anything inside it
 * (`:has(:focus-visible)`).
 */
export const StyledDateFieldTrigger = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  outline: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:disabled {
    cursor: not-allowed;
  }
`
