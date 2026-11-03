import styled, { css } from "styled-components"
import Flex from "@niceprototypes/flex"
import type { FlexGapSizeType } from "@niceprototypes/flex"
import { getToken } from "@niceprototypes/styles"
import { getToken as getDocsToken } from "../tokens"

/**
 * Flex, capped at the content width when `$wrapped`.
 *
 * In a column, the flex gap is the only space between blocks: block margins and
 * `<br />` spacers are dropped. A heading and the block after it, and a
 * paragraph and the list after it, belong together, so they sit one base gap
 * apart instead of the full gap.
 */
export const ContentFlexStyled = styled(Flex)<{ $wrapped: boolean; $gap: FlexGapSizeType }>`
  ${({ direction, $gap }) =>
    direction === "column" &&
    css`
      & > :is(p, ul, ol, blockquote) {
        margin-block: 0;
      }

      & > br {
        display: none;
      }

      & > :is(h1, h2, h3, h4, h5, h6) + *,
      & > :not(h1, h2, h3, h4, h5, h6, ul, ol) + :is(ul, ol) {
        margin-top: calc(${getToken("gap")} - ${getToken("gap", $gap)});
      }
    `}

  ${({ $wrapped }) =>
    $wrapped &&
    css`
      width: 100%;
      min-width: 0;
      max-width: ${getDocsToken("docs", "columnWidth")};
    `}
`
