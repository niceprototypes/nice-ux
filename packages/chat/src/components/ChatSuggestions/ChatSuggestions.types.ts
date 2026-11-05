/**
 * ChatSuggestionsItemType
 *
 * One suggestion: a stable `id` and the `label` its button shows.
 */
export type ChatSuggestionsItemType = { id: string; label: string }

/**
 * ChatSuggestionsItemsType
 *
 * The suggestions, in order.
 */
export type ChatSuggestionsItemsType = ReadonlyArray<ChatSuggestionsItemType>

/**
 * ChatSuggestionsOnPickType
 *
 * Called with the suggestion whose button was pressed.
 */
export type ChatSuggestionsOnPickType = (item: ChatSuggestionsItemType) => void

/**
 * ChatSuggestionsProps
 *
 * Complete prop definition for the ChatSuggestions component.
 */
export interface ChatSuggestionsProps {
  /** The suggestions */
  items: ChatSuggestionsItemsType
  /** Called with the picked suggestion */
  onPick: ChatSuggestionsOnPickType
}

// Declaration merging: const + namespace creates exportable type namespace
const ChatSuggestionsTypes = {} as const

namespace ChatSuggestionsTypes {
  export type Item = ChatSuggestionsItemType
  export type Items = ChatSuggestionsItemsType
  export type OnPick = ChatSuggestionsOnPickType
  export type Props = ChatSuggestionsProps
}

export default ChatSuggestionsTypes
