import * as React from "react"
import Button from "@niceprototypes/button"
import { copyToClipboard } from "@niceprototypes/code"
import type { ChatCopyActionProps } from "./ChatCopyAction.types"

/**
 * A message action: a ghost copy-icon button that copies `text` to the clipboard.
 *
 * @example
 * ```tsx
 * <ChatMessage role="assistant" actions={<ChatCopyAction text={reply} />}>…</ChatMessage>
 * ```
 */
const ChatCopyAction: React.FC<ChatCopyActionProps> = ({ text }) => (
  <Button
    iconLeft="copy"
    size="small"
    ghost
    aria-label="Copy"
    onClick={() => copyToClipboard(text)}
  />
)

export default ChatCopyAction
