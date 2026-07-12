import { LabelFlex } from "./CodeBlockLabel.styles"
import { LANG_LABELS } from "./CodeBlockLabel.constants"
import type { CodeBlockLabelProps } from "./CodeBlockLabel.types"
import Typography from "../../../nice/Typography"

/** Language badge for a code block. Renders nothing when no language is given. */
export const CodeBlockLabel = ({ language }: CodeBlockLabelProps) => {
  const key = (language ?? "").toLowerCase()
  // No language on the fence — nothing meaningful to badge.
  if (!key) return null
  return (
    <LabelFlex>
      <Typography
        as="span"
        size="smaller"
        weight="semibold"
        color="lightest"
      >
        {LANG_LABELS[key] ?? key.toUpperCase()}
      </Typography>
    </LabelFlex>
  )
}
