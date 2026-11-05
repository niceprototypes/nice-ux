import * as React from "react"
import { StyledChatMessage, StyledChatMessageActions, StyledChatMessageContent } from "./ChatMessage.styles"
import type { ChatMessageProps } from "./ChatMessage.types"

/**
 * One chat turn. A user message is an end-aligned bubble; an assistant message is full width
 * with no bubble, so its content (e.g. Markdown) reads as a document. The actions row shows on
 * hover and focus within, always on the last message, and not while the message streams.
 *
 * @example
 * ```tsx
 * <ChatMessage role="assistant" actions={<ChatCopyAction text={reply} />}>
 *   <Markdown>{reply}</Markdown>
 * </ChatMessage>
 * ```
 */
const ChatMessage: React.FC<ChatMessageProps> = ({ role, children, status = "base", actions }) => (
  <StyledChatMessage
    $role={role}
    $status={status}
    aria-busy={status === "streaming" || undefined}
  >
    <StyledChatMessageContent $role={role}>{children}</StyledChatMessageContent>
    {actions && status !== "streaming" && <StyledChatMessageActions>{actions}</StyledChatMessageActions>}
  </StyledChatMessage>
)

export default ChatMessage
