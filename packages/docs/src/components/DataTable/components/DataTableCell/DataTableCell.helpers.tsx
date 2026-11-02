import * as React from "react"
import { ClickHint } from "../../../ClickHint"

/**
 * Wrap a copyable node with the click-to-copy hint icon — a ClickHint pinned to
 * the "copy" glyph. The wrapped node keeps its own click-to-copy handler; the
 * icon is the visual cue. Thin convenience over `<ClickHint icon="copy">`, which
 * now owns the render-icon-and-reveal-on-hover behavior.
 */
export const withCopyAffordance = (node: React.ReactNode): React.ReactElement => (
  <ClickHint icon="copy">{node}</ClickHint>
)