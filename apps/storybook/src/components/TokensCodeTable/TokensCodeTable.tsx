import { getConstant, getTokenValue } from "nice-react-styles"
import { CodeRow } from "../CodeRow"
import { CodeTable } from "../CodeTable"
import type { TokensCodeTableProps } from "./TokensCodeTable.types"
import { useNiceTheme, useHighlightedVariant } from "./TokensCodeTable.hooks"

/**
 * A token reference table. Renders one row per `variants` entry: the CSS/JS
 * code cells and the resolved Value cell are derived from `name` (the group) +
 * the row's variant, and `preview(item)` supplies the bespoke demo cell — so
 * the MDX is pure data (variants + a preview fn) with no inlined map or rows.
 *
 * Theme-reactive tokens (those whose night value differs from day) switch all
 * three text columns to their night form while Storybook dark mode is on.
 */
export const TokensCodeTable = ({
  name,
  variants,
  preview,
  showName = true,
  columnWidths = ["12em", "16em", "20em"],
  columnHeaders,
  columns = [
    null,
    { shiki: true, size: "small" },
    { shiki: true },
    { code: true, size: "small", color: "lighter", clickToCopy: true },
  ],
  ...rest
}: TokensCodeTableProps) => {
  // Hiding the name column shifts every column left, so drop the leading
  // width/header slot (column 0) too to keep the rest aligned.
  const widths = showName ? columnWidths : columnWidths.slice(1)
  const headers = showName ? columnHeaders : columnHeaders?.slice(1)
  const isNight = useNiceTheme() === "night"
  const highlightedVariant = useHighlightedVariant(name ?? "")
  return (
    <CodeTable
      name={showName ? name : undefined}
      columnWidths={widths}
      columnHeaders={headers}
      {...rest}
    >
      {variants?.map(item => {
        const variant = typeof item === "string" ? item : item.variant
        const group = name ?? ""
        // `pristine` reads the canonical seed, not the runtime registry — so the
        // reference page shows real defaults even though src/nice/tokens.ts
        // overrides some tokens (Avenir, etc.) for Storybook's own styling.
        const dayValue = getTokenValue(group, { variant, pristine: true })
        const nightValue = getTokenValue(group, {
          variant,
          theme: "night",
          pristine: true,
        })
        // A token is theme-reactive only when its night value differs from day.
        // Non-themed tokens (gap, fontSize, …) keep their base form in both modes.
        const themed = nightValue !== dayValue
        const theme = isNight && themed ? "night" : undefined
        // Every text cell is a plain string so any column can opt into `shiki`
        // (a CodeBlock) or text styling via its `columns` entry. The default
        // columns render the CSS var + value as monospace text and the JS call
        // as a syntax-highlighted block.
        const cssVar = getConstant(
          group,
          variant,
          theme ? { theme } : undefined
        )
        // Emit the positional variant when it is non-base, or when a theme follows it
        // (the variant must be present to reach the options argument).
        const variantArg = variant !== "base" || theme ? `, "${variant}"` : ""
        const optionsArg = theme ? `, { theme: "${theme}" }` : ""
        const jsCall = `getToken("${group}"${variantArg}${optionsArg})`
        return (
          <CodeRow
            key={variant}
            inline
            language="tsx"
            highlighted={variant === highlightedVariant}
            cells={[
              preview?.(item),
              cssVar,
              jsCall,
              isNight ? nightValue : dayValue,
            ]}
            columns={columns}
          />
        )
      })}
    </CodeTable>
  )
}
