import { getConstant, getTokenValue } from "nice-react-styles"
import type { DataColumn, DataRowItem } from "../DataTable"
import type { TokenVariant } from "./TokensDataTable.types"
import type { HighlightedToken } from "./TokensDataTable.hooks"

/**
 * The four data columns of a module-token table, in order: the preview node, the
 * CSS variable (Shiki), the getToken() call (Shiki), and the resolved value
 * (monospace, click-to-copy). The leading group-name column is structural and
 * prepended by DataTable/DataTableSet, so it is not listed here.
 */
export const TOKEN_COLUMNS: DataColumn[] = [
  { key: "preview", header: null, width: "16em", render: "node" },
  { key: "css", header: "CSS", width: "20em", render: "shiki", language: "tsx" },
  { key: "js", header: "JS", render: "shiki", language: "tsx" },
  { key: "value", header: "Value", render: "text", code: true, size: "small", color: "lighter", clickToCopy: true },
]

/** The variant string of an item — the item itself, or its `variant` field. */
export const variantKey = (item: TokenVariant): string => (typeof item === "string" ? item : item.variant)

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
 * `TOKEN_COLUMNS`: [preview, cssVar, jsCall, resolvedValue].
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
      values: [preview?.(item), cssVar, jsCall, isNight ? nightValue : dayValue],
      highlighted: highlight?.group === group && highlight.variant === variant,
    }
  })
}
