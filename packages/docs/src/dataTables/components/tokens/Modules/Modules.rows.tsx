import * as React from "react"
import { getToken } from "@niceprototypes/styles"
import type { TokenGroup, TokenVariants } from "@niceprototypes/styles"
import { TokenName, variantKey } from "../../../utilities"
import ThemeValue from "../../../../components/ThemeValue"
import { tokenCode } from "./Modules.tokenCode"
import type { DataTableConfig, DataRowItem } from "../../../../components/DataTable"
import type { TokenGroupConfig } from "./Modules.types"
import type { HighlightedToken } from "./Modules.hooks"

/**
 * Build the data rows for one token group, given the runtime theme and the
 * active deep-link highlight. Each row's `values` are index-aligned to the
 * group's column set in `src/data/storybook.json`:
 * - `tokenModule`: [preview, tokenName, cssVar, jsCall, resolvedValue]
 * - `tokenColor`: [tokenName, cssVar, lightValue, darkValue]
 *
 * `pristine` reads the canonical seed, not the runtime registry — so the
 * reference page shows real defaults even though src/nice/tokens.ts overrides
 * some tokens (Avenir, etc.) for Storybook's own styling. A token is
 * theme-reactive only when its night value differs from day; non-themed tokens
 * keep their base form in both modes.
 */
/** Pristine night value, or the day value for tokens with no night value (getToken throws on those). */
function nightValueOf(group: TokenGroup, variant: TokenVariants[TokenGroup], dayValue: string): string {
  try {
    return getToken(group, variant, { theme: "night", pristine: true, as: "value" })
  } catch {
    return dayValue
  }
}

export function buildTokenRows(
  { name: group, variants, preview, columnSet }: TokenGroupConfig,
  isNight: boolean,
  highlight: HighlightedToken | null
): DataRowItem[] {
  return variants.map(item => {
    const variant = variantKey(item)
    const dayValue = getToken(group, variant, { pristine: true, as: "value" })
    const nightValue = nightValueOf(group, variant, dayValue)
    const themed = nightValue !== dayValue
    const theme = isNight && themed ? "night" : undefined
    // A colour row shows both themes, so its code is the unpinned (semantic) form.
    const { cssVar, jsCall } = tokenCode(group, variant, columnSet === "tokenColor" ? undefined : theme)
    // Each value cell is pinned to its theme, so the unpinned read resolves per cell.
    const values =
      columnSet === "tokenColor"
        ? [
            <TokenName variant={variant} />,
            cssVar,
            <ThemeValue theme="day" color={getToken(group, variant)} value={dayValue} />,
            <ThemeValue theme="night" color={getToken(group, variant)} value={nightValue} />,
          ]
        : [preview?.(item), <TokenName variant={variant} />, cssVar, jsCall, isNight ? nightValue : dayValue]
    return {
      id: variant,
      values,
      highlighted: highlight?.group === group && highlight.variant === variant,
    }
  })
}

/**
 * Build one token group as a `DataTable` node — its `name` heading and `rows`.
 * The single bridge from a token config to the generic renderer.
 */
export function buildTokenTable(
  group: TokenGroupConfig,
  isNight: boolean,
  highlight: HighlightedToken | null,
  name?: React.ReactNode
): DataTableConfig {
  return {
    name: name ?? group.name,
    rows: buildTokenRows(group, isNight, highlight),
  }
}
