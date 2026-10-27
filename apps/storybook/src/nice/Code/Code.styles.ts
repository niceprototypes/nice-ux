import styled from "styled-components"
import ContentFlex from "../ContentFlex"
import { getToken } from "nice-react-styles"

/**
 * Sizing wrapper for storybook Code instances: a ContentFlex, so `wrapped` caps
 * it at the content width, and the card inside always fits its parent.
 *
 * nice-react-code's card hardcodes `max-width: 720px` (with `width: max-content`
 * when `fit`), which ignores the viewport — so the child rule re-caps the card to
 * this wrapper.
 */
export const CodeFlex = styled(ContentFlex)`
  min-width: 0;

  & > * {
    max-width: 100%;
  }

  /* A block Code directly after another Code sits one base gap below it. Inlined
     instances are skipped: \`+\` ignores text nodes, so two inlined Codes in one
     sentence would otherwise count as adjacent. */
  ${({ inlined }) =>
    !inlined &&
    `& + & {
      margin-top: ${getToken("gap")};
    }`}
`
