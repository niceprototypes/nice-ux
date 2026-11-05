import * as React from "react"
import Icon from "@niceprototypes/icon"
import { CopyDiv, CopySpan } from "./CodeCopy.styles"
import { LANG_LABELS } from "./CodeCopy.constants"
import { copyToClipboard } from "../../services/copyToClipboard"
import type { CodeCopyProps } from "./CodeCopy.types"

/**
 * The copy icon pinned to the top-right of a code block, named "Copy {language}" for screen
 * readers. A click, Enter or Space copies the code.
 */
export const CodeCopy = ({ code, language }: CodeCopyProps) => {
  const key = (language ?? "").toLowerCase()
  const label = key ? `Copy ${LANG_LABELS[key] ?? key.toUpperCase()}` : "Copy"
  const onKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return
    event.preventDefault()
    copyToClipboard(code)
  }
  return (
    <CopyDiv>
      <CopySpan role="button" tabIndex={0} aria-label={label} onClick={() => copyToClipboard(code)} onKeyDown={onKeyDown}>
        <Icon name="copy" size="small" />
      </CopySpan>
    </CopyDiv>
  )
}
