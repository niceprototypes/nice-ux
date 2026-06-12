import { Pill } from "./CodeLabel.styles"
import { LANG_LABELS } from "./CodeLabel.constants"
import type { CodeLabelProps } from "./CodeLabel.types"
import Typography from "nice-react-typography"

/** Language badge for a code block. Renders nothing when no language is given. */
export const CodeLabel = ({ language }: CodeLabelProps) => {
  const key = (language ?? "").toLowerCase()
  // No language on the fence — nothing meaningful to badge.
  if (!key) return null
  return (
    <Pill>
      <Typography
        as="span"
        size="smaller"
        weight="semibold"
        color="lightest"
      >
        {LANG_LABELS[key] ?? key.toUpperCase()}
      </Typography>
    </Pill>
  )
}
