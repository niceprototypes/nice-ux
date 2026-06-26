import * as React from "react"
import Flex from "nice-react-flex"
import { getToken } from "nice-react-styles"

export interface PreviewCellProps {
  /** Fill color — any CSS color / token value. Omit for no fill. */
  backgroundColor?: string
  /** Border color. Omit for no border. */
  borderColor?: string
  /** Border thickness (CSS length). @default "1px" */
  borderWidth?: string
  /** Corner rounding (CSS length). @default the base borderRadius token */
  borderRadius?: string
  /** Fixed height (CSS length). */
  height?: string
  /** Fixed width (CSS length). Omit to fill the cell's width. */
  width?: string
  /** Stretch to fill the cell's width. @default true */
  grow?: boolean
  /** Demo content laid out inside the cell (e.g. a boxShadow surface). */
  children?: React.ReactNode
  /** Escape hatch for one-off style overrides. */
  style?: React.CSSProperties
}

/**
 * A reusable preview swatch for the Modules token tables. Most module previews
 * are the same shape — a filled, optionally-outlined, optionally-rounded box
 * that fills the cell — differing only in which token drives the fill, border,
 * radius, or size. This collapses that boilerplate: pass the colors (and a
 * height) you want to demonstrate, `children` for cells that wrap demo content
 * (e.g. boxShadow), or just a `backgroundColor` + `height` for a pure color
 * swatch.
 */
const PreviewCell = ({
  backgroundColor,
  borderColor,
  borderWidth = "1px",
  borderRadius = getToken("borderRadius"),
  height,
  width,
  grow = true,
  children,
  style,
}: PreviewCellProps) => (
  <Flex
    grow={grow ? 1 : undefined}
    style={{
      backgroundColor,
      height,
      width,
      border: borderColor ? `${borderWidth} solid ${borderColor}` : undefined,
      borderRadius,
      ...style,
    }}
  >
    {children}
  </Flex>
)

export default PreviewCell
