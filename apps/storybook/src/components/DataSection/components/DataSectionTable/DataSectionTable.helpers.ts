import type { FontSizeType, FontWeightType } from "nice-react-styles"
import type { DataTable } from "../DataSection/DataSection.types"

/** Heading elements a table title can render as. */
export type TableHeadingAs = "h1" | "h2" | "h3" | "h4" | "p" | "span"

/** Heading level by nesting depth: 0 → h2, 1 → h3, 2+ → h4. */
export const LEVELS: TableHeadingAs[] = ["h2", "h3", "h4"]

/** React key for a table — its string name, else the index. */
export const tableKey = (table: DataTable, index: number): React.Key =>
  typeof table.name === "string" ? table.name : index

interface TableHeadingStyle {
  size?: FontSizeType
  weight?: FontWeightType
  code?: boolean
}

/**
 * House Typography styling per heading level. All levels are monospace (`code`);
 * h2 is larger + semibold, h3 large + semibold, h4 small (regular weight).
 */
export const tableHeadingProps = (as: TableHeadingAs): TableHeadingStyle => {
  switch (as) {
    case "h2":
      return { size: "larger", weight: "semibold", code: true }
    case "h3":
      return { size: "large", weight: "semibold", code: true }
    case "h4":
      return { size: "base", code: true }
    default:
      return {}
  }
}