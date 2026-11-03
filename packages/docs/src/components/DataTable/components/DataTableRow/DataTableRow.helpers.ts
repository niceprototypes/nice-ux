/** The breakpoint from which a table's rows lay their columns out side by side; below it they stack. */
export type RowFromType = "tablet" | "laptop"

/** Responsive layout by `RowFromType`: stacked below it, a row of columns from it up. */
export const ROW_BREAKPOINTS = {
  tablet: { "tablet+": { direction: "row", alignItems: "center" } },
  laptop: { "laptop+": { direction: "row", alignItems: "center" } },
} as const
