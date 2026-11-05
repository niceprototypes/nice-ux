import * as React from "react"

/**
 * ChatLogChildrenType
 *
 * The messages, in order: usually ChatMessage elements.
 */
export type ChatLogChildrenType = React.ReactNode

/**
 * ChatLogStreamingType
 *
 * Whether a reply is streaming in. Sets `aria-busy` on the log, so assistive technology
 * announces the reply once it is complete.
 */
export type ChatLogStreamingType = boolean

/**
 * ChatLogAriaLabelType
 *
 * The log's accessible name.
 */
export type ChatLogAriaLabelType = string

/**
 * ChatLogProps
 *
 * Complete prop definition for the ChatLog component.
 */
export interface ChatLogProps {
  /** The messages */
  children?: ChatLogChildrenType
  /** A reply is streaming in */
  streaming?: ChatLogStreamingType
  /** Accessible name of the log */
  "aria-label": ChatLogAriaLabelType
}

// Declaration merging: const + namespace creates exportable type namespace
const ChatLogTypes = {} as const

namespace ChatLogTypes {
  export type Children = ChatLogChildrenType
  export type Streaming = ChatLogStreamingType
  export type AriaLabel = ChatLogAriaLabelType
  export type Props = ChatLogProps
}

export default ChatLogTypes
