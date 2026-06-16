import { StoryHeader } from "../../../src/components/Story"
import { TokensCodeTable } from "../TokensCodeTable"
import type { ColumnHeader } from "../../../src/components/CodeTable/CodeTable.types"
import type { TokenTable } from "./TokenTable.types"

import { animationDuration } from "./animationDuration"
import { animationEasing } from "./animationEasing"
import { backgroundColor } from "./backgroundColor"
import { borderColor } from "./borderColor"
import { borderRadius } from "./borderRadius"
import { borderWidth } from "./borderWidth"
import { boxShadow } from "./boxShadow"
import { cellHeight } from "./cellHeight"
import { fontFamily } from "./fontFamily"
import { fontSize } from "./fontSize"
import { fontWeight } from "./fontWeight"
import { color } from "./color"
import { gap } from "./gap"
import { lineHeight } from "./lineHeight"

export type { TokenTable } from "./TokenTable.types"

/**
 * Single source of truth for every token table — one module per file in this
 * folder. Both the Tokens/Docs page and each standalone Tokens/<group> story
 * render from these configs, so the two never drift. Key order here is the
 * order tables appear on the Docs page.
 */
export const tokenTables = {
  animationDuration,
  animationEasing,
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  boxShadow,
  cellHeight,
  fontFamily,
  fontSize,
  fontWeight,
  color,
  gap,
  lineHeight,
} satisfies Record<string, TokenTable>

/** Tables in Docs-page order. */
export const tokenTableList: TokenTable[] = Object.values(tokenTables)

/**
 * The CSS / JS / Value column header labels — shared by the Docs header row and
 * each standalone story's table so the labels are defined in one place. Columns
 * 0–1 (name + preview) are unlabeled.
 */
export const tokenColumnHeaders: ColumnHeader[] = [null, null, "CSS", "JS", "Value"]

/**
 * Renders one token group as a standalone story — the story header, its
 * description, and the shared TokensCodeTable, including the CSS/JS/Value header
 * row. Driven by the same config (and header) as the Docs page, so a story and
 * its Docs row can never disagree.
 */
export const TokenStory = ({ name }: { name: keyof typeof tokenTables }) => {
  const { description, ...table } = tokenTables[name]
  return (
    <>
      {/* Match the Tokens/Docs page width — the multi-column table needs the full
          container, not the default 980px docs measure. */}
      <style>{`.sbdocs.sbdocs-content { max-width: 100%; }`}</style>
      <StoryHeader title={table.name} description={description} line={false} />
      <TokensCodeTable
        columnHeaders={tokenColumnHeaders}
        showName={false}
        {...table}
      />
    </>
  )
}

/**
 * The full Tokens/Docs body — a standalone header row above every token table.
 * Lives here (not inlined in the MDX) so the Docs page stays declarative and
 * shares the same configs and header as the standalone stories.
 */
export const TokensDocs = () => (
  <>
    <TokensCodeTable columnHeaders={tokenColumnHeaders} />
    {tokenTableList.map(({ description, ...table }) => (
      <TokensCodeTable
        key={table.name}
        {...table}
      />
    ))}
  </>
)