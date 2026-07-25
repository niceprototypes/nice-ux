import * as React from "react"
import Icon from "nice-react-icon"
import type { IconNameType } from "nice-react-icon"
import { ClickHintWrapper } from "./ClickHint.styles"

interface ClickHintProps {
  /** Hint icon revealed on hover as the interaction cue (e.g. "copy", "github"). */
  icon: IconNameType
  children: React.ReactNode
}

/**
 * Renders content beside a hover-revealed hint icon — the job is purely the
 * visual cue. Pair it with an interactive ancestor that performs the action
 * (a ClickToCopy wrapper, an `<a>` link); ClickHint itself carries no handler.
 * The generic form of the former copy-only affordance, with the icon chosen by
 * the caller (`"copy"`, `"github"`, …).
 */
export const ClickHint: React.FC<ClickHintProps> = ({ icon, children }) => (
  <ClickHintWrapper>
    {children}
    <Icon name={icon} size="smaller" color="lightest" />
  </ClickHintWrapper>
)
