import * as React from "react"
import { getTokenValue } from "nice-react-styles"
import { TokenName } from "./TokenName"
import { tokenCode } from "./TokenTables.tokenCode"
import type { DataTable, DataRowItem } from "../DataSection"
import type { TokenGroupConfig, TokenVariant } from "./TokenTables.types"
import type { HighlightedToken } from "./TokenTables.hooks"

/** The variant string of an item — the item itself, or its `variant` field. */
export const variantKey = (item: TokenVariant): string => (typeof item === "string" ? item : item.variant)

/**
 * Build the data rows for one token group, given the runtime theme and the
 * active deep-link highlight. Each row's `values` are index-aligned to
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
      values: [<TokenName variant={variant} />, preview?.(item), cssVar, jsCall, isNight ? nightValue : dayValue],
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
): DataTable {
  return {
    name: name ?? group.name,
    rows: buildTokenRows(group.name, group.variants, group.preview, isNight, highlight),
  }
}
