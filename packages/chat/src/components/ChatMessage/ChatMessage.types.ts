import * as React from "react"

/**
 * ChatMessageRoleType
 *
 * Who wrote the message.
 *
 * Values:
 * - "user": an end-aligned bubble on the raised background, at most `chat.message.maxWidth:user` wide
 * - "assistant": full width, no bubble
 */
export type ChatMessageRoleType = "user" | "assistant"

/**
 * ChatMessageStatusType
 *
 * Where the message is in its lifecycle.
 *
 * Values:
 * - "base": complete; the actions row renders
 * - "streaming": still arriving; `aria-busy` is set and the actions row is withheld
 * - "error": failed; the text takes the error colour
 */
export type ChatMessageStatusType = "base" | "streaming" | "error"

/**
 * ChatMessageChildrenType
 *
 * The message content, e.g. Ink for a user message or Markdown for an assistant reply.
 */
export type ChatMessageChildrenType = React.ReactNode

/**
 * ChatMessageActionsType
 *
 * The actions row under the message (copy, retry, …). It shows on hover and on focus within
 * the message, and always on the last message.
 */
export type ChatMessageActionsType = React.ReactNode

/**
 * ChatMessageProps
 *
 * Complete prop definition for the ChatMessage component.
 */
export interface ChatMessageProps {
  /** Who wrote the message */
  role: ChatMessageRoleType
  /** The message content */
  children?: ChatMessageChildrenType
  /**
   * Lifecycle status
   * @default "base"
   */
  status?: ChatMessageStatusType
  /** Actions row under the message */
  actions?: ChatMessageActionsType
}

// Declaration merging: const + namespace creates exportable type namespace
const ChatMessageTypes = {} as const

namespace ChatMessageTypes {
  export type Role = ChatMessageRoleType
  export type Status = ChatMessageStatusType
  export type Children = ChatMessageChildrenType
  export type Actions = ChatMessageActionsType
  export type Props = ChatMessageProps
}

export default ChatMessageTypes
