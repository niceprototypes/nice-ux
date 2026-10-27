import type * as React from "react"
import * as Icons from "nice-icons"
import { iconNames, iconVariants } from "../constants"

/**
 * Convert a kebab-case icon name (or a variant stem) to the PascalCase used by
 * nice-icons exports. Matches nice-icons' own `toPascalCase`: "arrow-top" →
 * "ArrowTop", "check" → "Check", "base" → "Base", "3d" → "3d".
 */
function toPascalCase(name: string): string {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
}

type IconComponent = React.FunctionComponent<React.SVGAttributes<SVGElement>>

/** An icon's resolved variants, keyed by variant stem (`base`, `fill`, `3d`, …). */
export type IconVariantMap = Record<string, IconComponent>

/**
 * Build the icon map dynamically from nice-icons' `iconVariants` catalog. Each
 * entry maps an icon name to the components for the variants it ships, keyed by
 * variant stem. An icon is included only if its required `base` variant resolves;
 * variants whose export is missing are skipped.
 *
 * e.g. `{ check: { base: CheckBaseIcon, fill: CheckFillIcon }, "nice-logo": { base: NiceLogoBaseIcon } }`
 */
export function buildIconMap(): Record<string, IconVariantMap> {
  const map: Record<string, IconVariantMap> = {}

  for (const name of iconNames) {
    const pascalName = toPascalCase(name)
    const variants = (iconVariants as Record<string, readonly string[]>)[name] ?? []

    const resolved: IconVariantMap = {}
    for (const variant of variants) {
      const exportKey = `${pascalName}${toPascalCase(variant)}Icon` as keyof typeof Icons
      const Component = Icons[exportKey] as IconComponent | undefined
      if (Component) resolved[variant] = Component
    }

    // `base` is required — skip an icon whose default variant failed to resolve.
    if (resolved.base) map[name] = resolved
  }

  return map
}
