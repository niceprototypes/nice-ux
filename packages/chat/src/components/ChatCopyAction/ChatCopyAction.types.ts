/**
 * ChatCopyActionTextType
 *
 * The text the button copies, e.g. the message's markdown source.
 */
export type ChatCopyActionTextType = string

/**
 * ChatCopyActionProps
 *
 * Complete prop definition for the ChatCopyAction component.
 */
export interface ChatCopyActionProps {
  /** The text to copy */
  text: ChatCopyActionTextType
}

// Declaration merging: const + namespace creates exportable type namespace
const ChatCopyActionTypes = {} as const

namespace ChatCopyActionTypes {
  export type Text = ChatCopyActionTextType
  export type Props = ChatCopyActionProps
}

export default ChatCopyActionTypes
