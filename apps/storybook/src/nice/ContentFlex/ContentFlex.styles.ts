import styled, { css } from "styled-components"
import Flex from "nice-react-flex"
import { contentMaxWidth } from "nice-storybook-theme"

/** Flex, capped at the content width when `$wrapped`. */
export const ContentFlexStyled = styled(Flex)<{ $wrapped: boolean }>`
  ${({ $wrapped }) =>
    $wrapped &&
    css`
      width: 100%;
      min-width: 0;
      max-width: ${contentMaxWidth};
    `}
`
