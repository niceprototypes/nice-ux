import type * as React from "react"
import { buildIconMap } from "./buildIconMap"

const iconMap = buildIconMap()

/**
 * Resolve a built-in icon to its React SVG component by name and variant — the
 * internal resolver the `<Icon>` component renders. (The consumer-facing vanilla
 * string equivalent is `getIcon` in `nice-icons/get-icon`.)
 *
 * Variant resolution is dynamic: if the icon ships the requested variant it is
 * returned; if not, the icon's `base` variant is returned instead and a console
 * warning is emitted. Returns `undefined` only when the name itself is unknown.
 *
 * @param name - The icon name
 * @param variant - The variant stem to render (default "base"); e.g. "fill", "3d"
 * @returns The React component for the icon, or undefined if the name is unknown
 */
export function resolveIconComponent(
  name: string,
  variant: string = "base"
): React.FunctionComponent<React.SVGAttributes<SVGElement>> | undefined {
  const icon = iconMap[name]
  if (!icon) return undefined

  const Component = icon[variant]
  if (Component) return Component

  // Requested variant not available — fall back to base and warn.
  console.warn(
    `nice-react-icon: icon "${name}" has no "${variant}" variant; rendering "base". ` +
      `Available: ${Object.keys(icon).join(", ")}.`
  )
  return icon.base
}
