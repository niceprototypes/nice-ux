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