import { getColumns } from "../../../../data"

/**
 * Common column presets for story tables, read from the `columns` section of
 * `src/data/storybook.json` (the single data source). Kept as named exports while
 * the inline-table pages still import them; those pages move into the data file
 * in step 6 of manifest/.reports/storybook-data/plan.md, which removes these.
 */

/** [demo node, code block]. The default story-row shape. */
export const DEMO_CODE_COLUMNS = getColumns("demoCode").columns

/** [demo node, CSS code block]. As above but the code column is CSS. */
export const DEMO_CSS_COLUMNS = getColumns("demoCss").columns

/** [demo node, code block, trailing monospace note]. */
export const DEMO_CODE_NOTE_COLUMNS = getColumns("demoCodeNote").columns
