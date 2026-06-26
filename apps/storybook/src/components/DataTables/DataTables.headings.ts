import type { FontSizeType, FontWeightType } from "nice-react-styles"

/** Heading elements a table title can be rendered as. */
export type TableHeadingAs = "h1" | "h2" | "h3" | "h4" | "p" | "span"

interface TableHeadingStyle {
  size?: FontSizeType
  weight?: FontWeightType
  code?: boolean
}

/**
 * House Typography styling for the table heading levels, by element. One scale
 * shared across the whole table system so a module title (`h2`), a sub-group
 * title (`h3`), and a per-row token name (`h4`) read consistently wherever they
 * appear. All levels are monospace (`code`); h2 is larger + semibold, h3 is
 * large + semibold, h4 is small (regular weight).
 */
export const tableHeadingProps = (as?: TableHeadingAs): TableHeadingStyle => {
  switch (as) {
    case "h2":
      return { size: "larger", weight: "semibold", code: true }
    case "h3":
      return { size: "large", weight: "semibold", code: true }
    case "h4":
      return { size: "small", code: true }
    default:
      return {}
  }
}
