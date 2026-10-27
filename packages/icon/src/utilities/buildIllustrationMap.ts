import type * as React from "react"
import * as Assets from "nice-icons"
import { illustrationNames, illustrationVariants } from "../constants"

/**
 * Convert a kebab-case illustration name (or variant stem) to the PascalCase used
 * by nice-icons exports. Matches nice-icons' own `toPascalCase`: "nice-heart" →
 * "NiceHeart", "base" → "Base".
 */
function toPascalCase(name: string): string {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
}

type IllustrationComponent = React.FunctionComponent<React.SVGAttributes<SVGElement>>

/** An illustration's resolved variants, keyed by variant stem (`base`, …). */
export type IllustrationVariantMap = Record<string, IllustrationComponent>

/**
 * Build the illustration map dynamically from nice-icons' `illustrationVariants`
 * catalog. Each entry maps an illustration name to the components for the
 * variants it ships, keyed by variant stem. An illustration is included only if
 * its required `base` variant resolves. The React export name suffix is
 * `Illustration` (e.g. `NiceHeartBaseIllustration`), distinct from the icon
 * surface's `…Icon`.
 *
 * e.g. `{ "nice-heart": { base: NiceHeartBaseIllustration } }`
 */
export function buildIllustrationMap(): Record<string, IllustrationVariantMap> {
  const map: Record<string, IllustrationVariantMap> = {}

  for (const name of illustrationNames) {
    const pascalName = toPascalCase(name)
    const variants = (illustrationVariants as Record<string, readonly string[]>)[name] ?? []

    const resolved: IllustrationVariantMap = {}
    for (const variant of variants) {
      const exportKey = `${pascalName}${toPascalCase(variant)}Illustration` as keyof typeof Assets
      const Component = Assets[exportKey] as IllustrationComponent | undefined
      if (Component) resolved[variant] = Component
    }

    // `base` is required — skip an illustration whose default variant failed to resolve.
    if (resolved.base) map[name] = resolved
  }

  return map
}
