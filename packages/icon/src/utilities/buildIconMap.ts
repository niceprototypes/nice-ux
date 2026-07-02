import type * as React from "react"
import * as Icons from "nice-icons"
import { iconNames } from "../constants"

/**
 * Convert a kebab-case icon name to the PascalCase used by nice-icons exports.
 * Matches nice-icons' own `toPascalCase`: "arrow-top" → "ArrowTop", "check" → "Check".
 */
function toPascalCase(name: string): string {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
}

type IconComponent = React.FunctionComponent<React.SVGAttributes<SVGElement>>

interface IconVariants {
  Fill: IconComponent
  Stroke: IconComponent
}

/**
 * Dynamically builds the icon map from icon names
 */
export function buildIconMap(): Record<string, IconVariants> {
  const map: Record<string, IconVariants> = {}

  for (const name of iconNames) {
    const pascalName = toPascalCase(name)
    const fillKey = `${pascalName}FillIcon` as keyof typeof Icons
    const strokeKey = `${pascalName}StrokeIcon` as keyof typeof Icons

    const Fill = Icons[fillKey] as IconComponent | undefined
    const Stroke = Icons[strokeKey] as IconComponent | undefined

    if (Fill && Stroke) {
      map[name] = { Fill, Stroke }
    }
  }

  return map
}