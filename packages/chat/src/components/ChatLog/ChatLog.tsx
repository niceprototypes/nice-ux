import * as React from "react"
import { StyledChatLog, StyledChatLogMessages } from "./ChatLog.styles"
import ChatLogEnd from "./ChatLogEnd"
import type { ChatLogProps } from "./ChatLog.types"

/**
 * The conversation: a `<Scroll follow>` log that stays at the end while messages arrive and
 * replies stream in, and releases when the reader scrolls up. A "scroll to latest" button
 * shows while it is not at the end. `streaming` sets `aria-busy`.
 *
 * @example
 * ```tsx
 * <ChatLog aria-label="Conversation" streaming={busy}>
 *   {messages.map(message => <ChatMessage key={message.id} role={message.role}>…</ChatMessage>)}
 * </ChatLog>
 * ```
 */
const ChatLog: React.FC<ChatLogProps> = ({ children, streaming = false, "aria-label": ariaLabel }) => (
  <StyledChatLog
    follow
    role="log"
    aria-label={ariaLabel}
    aria-busy={streaming || undefined}
  >
    <StyledChatLogMessages>{children}</StyledChatLogMessages>
    <ChatLogEnd />
  </StyledChatLog>
)

export default ChatLog
