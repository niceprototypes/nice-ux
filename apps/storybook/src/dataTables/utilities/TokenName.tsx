import * as React from "react"
import Flex from "@niceprototypes/flex"
import Icon from "@niceprototypes/icon"
import Tooltip from "@niceprototypes/tooltip"
import Ink from "../../nice/Ink"

interface TokenNameProps {
  /** The token variant name shown in the first column. */
  variant: string
  /**
   * Flag the default variant — renders a check `Icon` + "Default" tooltip in the
   * lighter color. For module tokens that's simply `variant === "base"`;
   * component tokens pass their own (the path leaf is base). @default variant === "base"
   */
  isDefault?: boolean
}

/**
 * The token-name cell, shared by the module and component token tables. The
 * default variant renders in the lighter color with a small check Icon (and a
 * "Default" tooltip) to flag it; every other variant renders its name plainly.
 */
export const TokenName: React.FC<TokenNameProps> = ({ variant, isDefault = variant === "base" }) =>
  isDefault ? (
    <Flex direction="row" alignItems="center">
      {/* Tooltip scoped to the check icon only — hovering the variant name should
          not surface the "Default" tooltip. */}
      <Tooltip delayShow={500} content="Default">
        <Icon name="check" size="smaller" color="lighter" />
      </Tooltip>
      <Ink code size="small" color="lighter">&nbsp;{variant}</Ink>
    </Flex>
  ) : (
    <Ink code size="small">{variant}</Ink>
  )
