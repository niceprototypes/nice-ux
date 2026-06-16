import * as React from "react"
import { getTokenValue } from "nice-react-styles"
import { CodeRow } from "../../src/components/CodeRow"
import { CodeTable } from "../../src/components/CodeTable"

/**
 * A row's variant: a bare variant name, or an object carrying the `variant`
 * plus any extra data the `preview` render needs (e.g. an SVG path or label).
 */
export type TokenVariant = string | { variant: string; [key: string]: unknown }

type TokensCodeTableProps = {
  /** camelCase token group; also the table's leading name-column label. */
  name?: string
  /** Rows to render — variant names, or objects with a `variant` key. */
  variants?: ReadonlyArray<TokenVariant>
  /** Returns the bespoke preview cell for a row, given its variant item. */
  preview?: (item: TokenVariant) => React.ReactNode
} & Omit<React.ComponentProps<typeof CodeTable>, "name" | "children">

// camelCase token group → kebab CSS segment (fontSize → font-size).
const camelToKebab = (group: string): string =>
  group.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)

/**
 * The CSS-variable and getToken() doc strings shown in a row's CSS and JS
 * columns. The `base` variant uses the canonical short form — no `--base`
 * suffix on the variable and no second argument on getToken().
 */
const tokenCode = (group: string, variant: string): [string, string] => {
  const suffix = variant === "base" ? "" : `--${variant}`
  const arg = variant === "base" ? "" : `, "${variant}"`
  return [`var(--np--${camelToKebab(group)}${suffix})`, `getToken("${group}"${arg})`]
}

// The variant string of an item — the item itself, or its `variant` field.
const variantKey = (item: TokenVariant): string => (typeof item === "string" ? item : item.variant)

/**
 * A token reference table. Renders one row per `variants` entry: the CSS/JS
 * code cells and the resolved Value cell are derived from `name` (the group) +
 * the row's variant, and `preview(item)` supplies the bespoke demo cell — so
 * the MDX is pure data (variants + a preview fn) with no inlined map or rows.
 *
 * The page's column widths and value-cell font are preset here; pass the same
 * props to override per table.
 */
export const TokensCodeTable = ({ name, variants, preview, ...rest }: TokensCodeTableProps) => (
  <CodeTable
    name={name}
    fontWeight="medium"
    fontSize="small"
    columnWidths={["12em", "16em", "20em"]}
    {...rest}
  >
    {variants?.map((item) => {
      const variant = variantKey(item)
      return (
        <CodeRow
          key={variant}
          inline
          language="tsx"
          previewCell={preview?.(item)}
          code={tokenCode(name ?? "", variant)}
          value={getTokenValue(name ?? "", variant)}
        />
      )
    })}
  </CodeTable>
)
