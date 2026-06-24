import { StoryHeader } from "../../../../src/components/Story"
import { TokensDataTable, TokensDataTableSet } from "../../../../src/components/TokensDataTable"
import type { TokenTable } from "../TokenTable.types"

import { animationDuration } from "./animationDuration"
import { animationEasing } from "./animationEasing"
import { backgroundColor } from "./backgroundColor"
import { backgroundSize } from "./backgroundSize"
import { borderColor } from "./borderColor"
import { borderRadius } from "./borderRadius"
import { borderWidth } from "./borderWidth"
import { boxShadow } from "./boxShadow"
import { brandColor } from "./brandColor"
import { cellHeight } from "./cellHeight"
import { fontFamily } from "./fontFamily"
import { fontSize } from "./fontSize"
import { fontWeight } from "./fontWeight"
import { color } from "./color"
import { gap } from "./gap"
import { letterSpacing } from "./letterSpacing"
import { lineHeight } from "./lineHeight"

export type { TokenTable } from "../TokenTable.types"

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
  backgroundSize,
  borderColor,
  borderRadius,
  borderWidth,
  boxShadow,
  brandColor,
  cellHeight,
  fontFamily,
  fontSize,
  fontWeight,
  color,
  gap,
  letterSpacing,
  lineHeight,
} satisfies Record<string, TokenTable>

/** Tables in Docs-page order. */
export const tokenTableList: TokenTable[] = Object.values(tokenTables)

/**
 * Renders one token group as a standalone story — the story header, its
 * description, and the shared TokensDataTable (column headers, no name column).
 * Driven by the same config as the Docs page, so a story and its Docs row can
 * never disagree.
 */
export const TokenStory = ({ name }: { name: keyof typeof tokenTables }) => {
  const { description, ...table } = tokenTables[name]
  return (
    <>
      {/* Match the Tokens/Docs page width — the multi-column table needs the full
          container, not the default 980px docs measure. */}
      <style>{`.sbdocs.sbdocs-content { max-width: 100%; }`}</style>
      <StoryHeader title={table.name} description={description} />
      <TokensDataTable showName={false} {...table} />
    </>
  )
}

/**
 * The full Tokens/Docs body — every token group as one aligned table-of-tables
 * under a single shared header. Lives here (not inlined in the MDX) so the Docs
 * page stays declarative and shares the same configs as the standalone stories.
 */
export const TokensDocs = () => <TokensDataTableSet groups={tokenTableList} />