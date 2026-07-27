import type * as React from "react"
import { buildIllustrationMap } from "./buildIllustrationMap"

const illustrationMap = buildIllustrationMap()

/**
 * Resolve a built-in illustration to its React SVG component by name and variant
 * — the internal resolver the `<Illustration>` component renders. (The
 * consumer-facing vanilla string equivalent is `getIllustration` in nice-icons.)
 *
 * Variant resolution is dynamic: if the illustration ships the requested variant
 * it is returned; if not, its `base` variant is returned and a console warning is
 * emitted. Returns `undefined` only when the name itself is unknown.
 *
 * @param name - The illustration name
 * @param variant - The variant stem to render (default "base")
 * @returns The React component, or undefined if the name is unknown
 */
export function resolveIllustrationComponent(
  name: string,
  variant: string = "base"
): React.FunctionComponent<React.SVGAttributes<SVGElement>> | undefined {
  const illustration = illustrationMap[name]
  if (!illustration) return undefined

  const Component = illustration[variant]
  if (Component) return Component

  // Requested variant not available — fall back to base and warn.
  console.warn(
    `nice-react-icon: illustration "${name}" has no "${variant}" variant; rendering "base". ` +
      `Available: ${Object.keys(illustration).join(", ")}.`
  )
  return illustration.base
}
