import * as Icons from "nice-icons"
import { iconNames } from "../constants"
import { capitalize } from "./capitalize"

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
    const pascalName = capitalize(name)
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