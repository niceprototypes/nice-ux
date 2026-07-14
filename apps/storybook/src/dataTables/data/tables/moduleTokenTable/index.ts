// Data for the ModuleTokenTable — one file per token module (each an
// `export const` config). Add a module by dropping a new `{name}.tsx` here and
// listing it in `tokenTables` below; the key order is the Tokens/Docs order.
import type { TokenTable } from "./types"
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
import { zIndex } from "./zIndex"

export type { TokenTable } from "./types"
export {
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
  zIndex,
}

/** Single source of truth for every token table — key order is Tokens/Docs order. */
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
  zIndex,
} satisfies Record<string, TokenTable>

/** Token tables in Docs-page order. */
export const tokenTableList: TokenTable[] = Object.values(tokenTables)
