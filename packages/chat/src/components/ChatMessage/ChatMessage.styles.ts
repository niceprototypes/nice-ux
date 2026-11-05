import styled, { css } from "styled-components"
import { getToken } from "@niceprototypes/styles"
import type { ChatMessageRoleType, ChatMessageStatusType } from "./ChatMessage.types"

/** The actions row: hidden until the message is hovered or holds focus, unless it is the last. */
export const StyledChatMessageActions = styled.div`
  opacity: 0;
`

/** One message: user messages align to the end, assistant messages fill the width. */
export const StyledChatMessage = styled.div<{ $role: ChatMessageRoleType; $status: ChatMessageStatusType }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $role }) => ($role === "user" ? "flex-end" : "stretch")};

  ${({ $status }) =>
    $status === "error" &&
    css`
      color: ${getToken("color", "error")};
    `}

  &:hover ${StyledChatMessageActions},
  &:focus-within ${StyledChatMessageActions},
  &:last-child ${StyledChatMessageActions} {
    opacity: 1;
  }
`

/** The content: a bubble for user messages, bare for assistant messages, both from `chat.message.*`. */
export const StyledChatMessageContent = styled.div<{ $role: ChatMessageRoleType }>`
  box-sizing: border-box;
  max-inline-size: ${({ $role }) => getToken(`chat.message.maxWidth:${$role}`)};
  padding: ${({ $role }) => getToken(`chat.message.padding:${$role}`)};
  border-radius: ${({ $role }) => getToken(`chat.message.borderRadius:${$role}`)};
  background-color: ${({ $role }) => getToken(`chat.message.backgroundColor:${$role}`)};
`
