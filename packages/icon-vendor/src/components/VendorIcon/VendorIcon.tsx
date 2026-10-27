import * as React from "react"
import type { VendorIconProps } from "./VendorIcon.types"

/**
 * Default SVG attributes — match Lucide's `defaultAttributes`. The same
 * surface the upstream `lucide-react` Icon component emits, owned locally
 * so we can drop the React middleware dependency.
 */
const DEFAULTS = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const

/**
 * VendorIcon
 *
 * Renders a Lucide-shaped iconNode tuple array as `<svg>`. Used by
 * `resolveVendorIcon` to produce the React.ComponentType that
 * `nice-react-icon`'s vendor-resolver mechanism expects.
 *
 * The component is intentionally not exported from the package root.
 * Vendor consumers reach Lucide icons via `<Icon vendor name="…" />` on
 * `nice-react-icon`; the resolver hands back a Bound component that
 * delegates here.
 */
const VendorIcon = React.forwardRef<SVGSVGElement, VendorIconProps>(
  ({ iconNode, children, ...rest }, ref) =>
    React.createElement(
      "svg",
      { ref, ...DEFAULTS, ...rest },
      [
        ...iconNode.map(([tag, attrs], i) =>
          React.createElement(tag, { key: i, ...attrs })
        ),
        ...(Array.isArray(children) ? children : children ? [children] : []),
      ]
    )
)

VendorIcon.displayName = "VendorIcon"

export default VendorIcon