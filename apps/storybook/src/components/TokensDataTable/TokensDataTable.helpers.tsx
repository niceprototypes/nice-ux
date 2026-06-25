import * as React from "react"
import { getConstant, getTokenValue } from "nice-react-styles"
import Flex from "nice-react-flex"
import Icon from "nice-react-icon"
import Typography from "../../nice/Typography"
import type { DataColumn, DataRowItem } from "../DataTable"
import type { TokenVariant } from "./TokensDataTable.types"
import type { HighlightedToken } from "./TokensDataTable.hooks"
import Tooltip from "nice-react-tooltip"

/**
 * The data columns of a module-token table, in order: the token (variant) name,
 * the preview node, the CSS variable (Shiki), the getToken() call (Shiki), and
 * the resolved value (monospace, click-to-copy). The leading group-name column
 * is structural and prepended by DataTable/DataTableSet, so it is not listed here.
 */
export const TOKEN_COLUMNS: DataColumn[] = [
  { key: "tokenName", header: "Token name", width: "8em", render: "node" },
  { key: "preview", header: null, width: "16em", render: "node" },
  { key: "css", header: "CSS", width: "20em", render: "shiki", language: "tsx" },
  { key: "js", header: "JS", render: "shiki", language: "tsx" },
  { key: "value", header: "Value", render: "text", code: true, size: "small", color: "lighter", clickToCopy: true },
]

/** The variant string of an item — the item itself, or its `variant` field. */
export const variantKey = (item: TokenVariant): string => (typeof item === "string" ? item : item.variant)

/**
 * The token-name cell, shared by the module and component token tables. The
 * default variant renders in the lighter color with a small check Icon (and a
 * "Default" tooltip) to flag it; every other variant renders its name plainly.
 * `isDefault` is the row's default flag — for module tokens that's simply
 * `variant === "base"`; component tokens pass their own (the path leaf is base).
 */
export const tokenNameCell = (variant: string, isDefault = variant === "base"): React.ReactNode =>
  isDefault ? (
    <Tooltip delayShow={500} content="Default">
      <Flex direction="row" gap="smaller" alignItems="center">
        <Typography code size="small" color="lighter">{variant}</Typography>
        <Icon name="check" size="smaller" color="lighter" />
      </Flex>
    </Tooltip>
  ) : (
    <Typography code size="small">{variant}</Typography>
  )

/**
 * The CSS-variable and getToken() doc strings for one variant. The CSS var is
 * built with the real `getConstant` generator so it always matches the emitted
 * token name; `base` is the implicit default and carries no segment. For
 * getToken() the variant is the second positional argument and `theme` stays in
 * the trailing options object.
 */
const tokenCode = (group: string, variant: string, theme?: string): { cssVar: string; jsCall: string } => {
  const cssVar = getConstant(group, variant, theme ? { theme } : undefined)
  // Emit the positional variant when non-base, or when a theme follows it (the
  // variant must be present to reach the options argument).
  const variantArg = variant !== "base" || theme ? `, "${variant}"` : ""
  const optionsArg = theme ? `, { theme: "${theme}" }` : ""
  return { cssVar, jsCall: `getToken("${group}"${variantArg}${optionsArg})` }
}

/**
 * Build the data rows for one token group, given the runtime theme and the
 * active deep-link highlight. Each row's values are index-aligned to
 * `TOKEN_COLUMNS`: [tokenName, preview, cssVar, jsCall, resolvedValue].
 *
 * `pristine` reads the canonical seed, not the runtime registry — so the
 * reference page shows real defaults even though src/nice/tokens.ts overrides
 * some tokens (Avenir, etc.) for Storybook's own styling. A token is
 * theme-reactive only when its night value differs from day; non-themed tokens
 * keep their base form in both modes.
 */
export function buildTokenRows(
  group: string,
  variants: ReadonlyArray<TokenVariant>,
  preview: ((item: TokenVariant) => React.ReactNode) | undefined,
  isNight: boolean,
  highlight: HighlightedToken | null
): DataRowItem[] {
  return variants.map(item => {
    const variant = variantKey(item)
    const dayValue = getTokenValue(group, { variant, pristine: true })
    const nightValue = getTokenValue(group, { variant, theme: "night", pristine: true })
    const themed = nightValue !== dayValue
    const theme = isNight && themed ? "night" : undefined
    const { cssVar, jsCall } = tokenCode(group, variant, theme)
    return {
      id: variant,
      values: [tokenNameCell(variant), preview?.(item), cssVar, jsCall, isNight ? nightValue : dayValue],
      highlighted: highlight?.group === group && highlight.variant === variant,
    }
  })
}
