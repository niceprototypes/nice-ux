import Ink from "nice-react-ink"
import { LabelFlex } from "./CodeLabel.styles"
import { LANG_LABELS } from "./CodeLabel.constants"
import type { CodeLabelProps } from "./CodeLabel.types"

/** Language badge for a code block. Renders nothing when no language is given. */
export const CodeLabel = ({ language }: CodeLabelProps) => {
  const key = (language ?? "").toLowerCase()
  // No language on the fence — nothing meaningful to badge.
  if (!key) return null
  return (
    <LabelFlex>
      <Ink as="span" code color="lightest">{LANG_LABELS[key] ?? key.toUpperCase()}</Ink>
    </LabelFlex>
  )
}
