import { Pill } from "./LangPill.styles"
import { LANG_LABELS } from "./LangPill.constants"
import type { LangPillProps } from "./LangPill.types"
import Typography from "nice-react-typography"

/** Language badge for a code block. Renders nothing when no language is given. */
export const LangPill = ({ language }: LangPillProps) => {
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
