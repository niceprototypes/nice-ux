import styled from "styled-components"
import ContentFlex from "../ContentFlex"
import { getToken } from "@niceprototypes/styles"

/**
 * Sizing wrapper for storybook Code instances: a ContentFlex, so `wrapped` caps
 * it at the content width, and the card inside always fits its parent.
 *
 * @niceprototypes/code's card fills its container up to the `code.maxWidth` token
 * (`width: max-content` when `fit`); the child rule keeps a fit card inside this
 * wrapper as well.
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
