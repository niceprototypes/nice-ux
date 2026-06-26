import type { DataColumn } from "./DataSection.types"

/**
 * Common column presets for story tables. The overwhelmingly common shape is a
 * rendered demo beside its source snippet ([demo node, code block]); the `note`
 * variant adds a trailing monospace label column. Import these instead of
 * re-declaring the column array in every story.
 */

/** [demo node, code block]. The default story-row shape. */
export const DEMO_CODE_COLUMNS: DataColumn[] = [
  { key: "demo", render: "node" },
  { key: "code", render: "shiki", language: "tsx" },
]

/** [demo node, CSS code block]. As above but the code column is CSS. */
export const DEMO_CSS_COLUMNS: DataColumn[] = [
  { key: "demo", render: "node" },
  { key: "code", render: "shiki", language: "css" },
]

/** [demo node, code block, trailing monospace note]. */
export const DEMO_CODE_NOTE_COLUMNS: DataColumn[] = [
  { key: "demo", render: "node" },
  { key: "code", render: "shiki", language: "tsx" },
  { key: "note", render: "text", code: true, size: "small" },
]
