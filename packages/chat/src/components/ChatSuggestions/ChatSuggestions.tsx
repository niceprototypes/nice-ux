import * as React from "react"
import Button from "@niceprototypes/button"
import Flex from "@niceprototypes/flex"
import type { ChatSuggestionsProps } from "./ChatSuggestions.types"

/**
 * Prompt suggestions: one rounded button per item, wrapping onto new lines.
 *
 * @example
 * ```tsx
 * <ChatSuggestions items={[{ id: "ease", label: "Ease the slide" }]} onPick={item => send(item.label)} />
 * ```
 */
const ChatSuggestions: React.FC<ChatSuggestionsProps> = ({ items, onPick }) => (
  <Flex
    wrap="wrap"
    gap="small"
  >
    {items.map(item => (
      <Button
        key={item.id}
        size="small"
        borderRadius="rounded"
        onClick={() => onPick(item)}
      >
        {item.label}
      </Button>
    ))}
  </Flex>
)

export default ChatSuggestions
