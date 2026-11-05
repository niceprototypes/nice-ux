import styled from "styled-components"
import Flex from "@niceprototypes/flex"
import { getToken } from "@niceprototypes/styles"

/**
 * The end slot: one line of the field tall, at its bottom, so the buttons centre on the first
 * line as in a one-line Input and stay beside the last line as the text grows.
 */
export const StyledChatComposerEnd = styled(Flex)`
  align-self: flex-end;
  block-size: ${getToken("input.size:base")};
`
