import * as React from "react"
import type { InputMaxRowsType, InputOnChangeType, InputPlaceholderType, InputValueType } from "@niceprototypes/input"

/**
 * ChatComposerValueType
 *
 * Re-export of InputValueType from @niceprototypes/input.
 * The message being written (controlled).
 */
export type ChatComposerValueType = InputValueType

/**
 * ChatComposerOnChangeType
 *
 * Re-export of InputOnChangeType from @niceprototypes/input.
 * Called with the new text on every edit.
 */
export type ChatComposerOnChangeType = InputOnChangeType

/**
 * ChatComposerOnSubmitType
 *
 * Called with the text on Enter (Shift+Enter inserts a newline) or the send button. Not called
 * while busy or disabled, or when the text is blank.
 */
export type ChatComposerOnSubmitType = (value: string) => void

/**
 * ChatComposerOnStopType
 *
 * Called by the stop button, and by Escape, while busy.
 */
export type ChatComposerOnStopType = () => void

/**
 * ChatComposerBusyType
 *
 * Whether a reply is in progress: the send button becomes a stop button and Escape stops.
 */
export type ChatComposerBusyType = boolean

/**
 * ChatComposerDisabledType
 *
 * Disables the text field, the send or stop button, and nothing can be sent.
 */
export type ChatComposerDisabledType = boolean

/**
 * ChatComposerPlaceholderType
 *
 * Re-export of InputPlaceholderType from @niceprototypes/input.
 */
export type ChatComposerPlaceholderType = InputPlaceholderType

/**
 * ChatComposerActionsType
 *
 * Extra controls before the send button (attach, model picker, …).
 */
export type ChatComposerActionsType = React.ReactNode

/**
 * ChatComposerMaxRowsType
 *
 * Re-export of InputMaxRowsType from @niceprototypes/input.
 * Growth cap in lines; past it the text field scrolls. Defaults to `chat.composer.maxRows`.
 */
export type ChatComposerMaxRowsType = InputMaxRowsType

/**
 * ChatComposerAriaLabelType
 *
 * Accessible name of the text field.
 */
export type ChatComposerAriaLabelType = string

/**
 * ChatComposerProps
 *
 * Complete prop definition for the ChatComposer component.
 */
export interface ChatComposerProps {
  /** The message being written */
  value: ChatComposerValueType
  /** Called with the new text on every edit */
  onChange: ChatComposerOnChangeType
  /** Called with the text on Enter or the send button */
  onSubmit: ChatComposerOnSubmitType
  /** Called by the stop button or Escape while busy */
  onStop?: ChatComposerOnStopType
  /**
   * A reply is in progress
   * @default false
   */
  busy?: ChatComposerBusyType
  /**
   * Disable the composer
   * @default false
   */
  disabled?: ChatComposerDisabledType
  /** Placeholder text */
  placeholder?: ChatComposerPlaceholderType
  /** Extra controls before the send button */
  actions?: ChatComposerActionsType
  /** Growth cap in lines */
  maxRows?: ChatComposerMaxRowsType
  /**
   * Accessible name of the text field
   * @default "Message"
   */
  "aria-label"?: ChatComposerAriaLabelType
}

// Declaration merging: const + namespace creates exportable type namespace
const ChatComposerTypes = {} as const

namespace ChatComposerTypes {
  export type Value = ChatComposerValueType
  export type OnChange = ChatComposerOnChangeType
  export type OnSubmit = ChatComposerOnSubmitType
  export type OnStop = ChatComposerOnStopType
  export type Busy = ChatComposerBusyType
  export type Disabled = ChatComposerDisabledType
  export type Placeholder = ChatComposerPlaceholderType
  export type Actions = ChatComposerActionsType
  export type MaxRows = ChatComposerMaxRowsType
  export type AriaLabel = ChatComposerAriaLabelType
  export type Props = ChatComposerProps
}

export default ChatComposerTypes
