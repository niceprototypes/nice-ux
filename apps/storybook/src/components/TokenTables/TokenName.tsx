import * as React from "react"
import Flex from "nice-react-flex"
import Icon from "nice-react-icon"
import Tooltip from "nice-react-tooltip"
import Typography from "../../nice/Typography"

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
    <Tooltip delayShow={500} content="Default">
      <Flex direction="row" alignItems="center">
        <Icon name="check" size="smaller" color="lighter" />
        <Typography code size="small" color="lighter">&nbsp;{variant}</Typography>
      </Flex>
    </Tooltip>
  ) : (
    <Typography code size="small">{variant}</Typography>
  )
