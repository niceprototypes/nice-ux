import * as React from "react"
import Button from "@niceprototypes/button"
import Flex from "@niceprototypes/flex"
import Input from "@niceprototypes/input"
import { getToken } from "@niceprototypes/styles"
import type { ChatComposerProps } from "./ChatComposer.types"

/**
 * The message composer: a one-line text field that grows to `maxRows` lines, with a send button
 * in its end slot. Enter sends, Shift+Enter inserts a newline. While `busy` the send button is a
 * stop button, and Escape stops too. `disabled` disables all of it.
 *
 * @example
 * ```tsx
 * <ChatComposer value={draft} onChange={setDraft} onSubmit={send} onStop={stop} busy={streaming} />
 * ```
 */
const ChatComposer: React.FC<ChatComposerProps> = ({
  value,
  onChange,
  onSubmit,
  onStop,
  busy = false,
  disabled = false,
  placeholder,
  actions,
  maxRows,
  "aria-label": ariaLabel = "Message",
}) => {
  const canSend = !busy && !disabled && value.trim() !== ""
  const submit = () => {
    if (canSend) onSubmit(value)
  }

  return (
    <Input
      as="textarea"
      rows={1}
      maxRows={maxRows ?? Number(getToken("chat.composer.maxRows", { as: "value" }))}
      value={value}
      onChange={onChange}
      onSubmit={submit}
      onKeyDown={event => {
        if (event.key !== "Escape" || !busy || disabled || !onStop) return
        event.preventDefault()
        onStop()
      }}
      disabled={disabled}
      placeholder={placeholder}
      aria-label={ariaLabel}
      end={
        <Flex
          gap="smaller"
          alignItems="center"
        >
          {actions}
          {busy ? (
            <Button
              iconLeft="pause"
              borderRadius="rounded"
              filled
              aria-label="Stop"
              disabled={disabled || !onStop}
              onClick={onStop}
            />
          ) : (
            <Button
              iconLeft="arrow-top"
              borderRadius="rounded"
              filled
              aria-label="Send"
              disabled={!canSend}
              onClick={submit}
            />
          )}
        </Flex>
      }
    />
  )
}

export default ChatComposer
