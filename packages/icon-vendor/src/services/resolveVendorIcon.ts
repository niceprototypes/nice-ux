import * as React from "react"
import { icons } from "lucide"
import VendorIcon from "../components/VendorIcon"
import type { VendorIconNodeType } from "../components/VendorIcon"

/**
 * resolveVendorIcon
 *
 * Resolves a Lucide icon name to a React component. Consumers use Lucide's
 * native PascalCase names (e.g. `"TrendingDown"`); the resolver looks up
 * the matching iconNode tuple in `lucide`'s `icons` aggregate and binds it
 * to the internal `VendorIcon` renderer.
 *
 * Returns `null` when the name does not match any Lucide icon, so
 * `nice-react-icon` can fall through to its placeholder.
 *
 * Replaces the previous `lucide-react`-backed implementation that imported
 * pre-built React components from `lucide-react`. Same icon coverage, same
 * call-site API — the React middleware is now owned by `VendorIcon` in
 * this package.
 *
 * @param name - Lucide icon name in PascalCase.
 */
export function resolveVendorIcon(name: string): React.ComponentType | null {
  const iconNode = (icons as Record<string, VendorIconNodeType | undefined>)[name]
  if (!iconNode) return null

  const Bound: React.FC<React.SVGAttributes<SVGSVGElement>> = (props) =>
    React.createElement(VendorIcon, { ...props, iconNode })
  Bound.displayName = name

  return Bound
}