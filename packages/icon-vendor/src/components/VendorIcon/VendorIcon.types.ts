import type * as React from "react"

/**
 * VendorIconNodeType
 *
 * One element in a Lucide-style icon-node array: a `[tag, attrs]` tuple.
 * `tag` is the SVG element name (`"path"`, `"circle"`, etc.). `attrs` is a
 * key/value record of SVG attributes for that element.
 *
 * Matches the shape exported by `lucide`'s per-icon modules:
 * `[["path", { d: "..." }], ["path", { d: "..." }]]`.
 */
export type VendorIconNodeType = [string, Record<string, unknown>][]

/**
 * VendorIconProps
 *
 * Props for the internal VendorIcon renderer. Accepts a Lucide-shaped
 * iconNode plus the SVG attributes the consumer wants forwarded.
 */
export interface VendorIconProps extends React.SVGAttributes<SVGSVGElement> {
  /** Lucide-style icon-node tuple array. */
  iconNode: VendorIconNodeType
}

const VendorIconTypes = {} as const

namespace VendorIconTypes {
  export type IconNode = VendorIconNodeType
  export type Props = VendorIconProps
}

export default VendorIconTypes