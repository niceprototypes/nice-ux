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
// Cache bound components by name so each Lucide icon keeps a stable component
// identity across calls. Without this, every resolve returns a fresh function,
// so a re-render (e.g. a button's onPointerDown) remounts the <svg> mid-press
// and the native click event — which needs pointerdown/up on the same node —
// never fires.
const boundCache = new Map<string, React.ComponentType>()

export function resolveVendorIcon(name: string): React.ComponentType | null {
  const cached = boundCache.get(name)
  if (cached) return cached

  const iconNode = (icons as Record<string, VendorIconNodeType | undefined>)[name]
  if (!iconNode) return null

  const Bound: React.FC<React.SVGAttributes<SVGSVGElement>> = (props) =>
    React.createElement(VendorIcon, { ...props, iconNode })
  Bound.displayName = name

  boundCache.set(name, Bound)
  return Bound
}