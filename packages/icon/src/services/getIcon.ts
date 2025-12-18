import { buildIconMap } from "../helpers/buildIconMap"

const iconMap = buildIconMap()

/**
 * Gets an icon component by name and outlined mode
 * @param name - The icon name
 * @param outlined - Use outlined/fill variant (true) or stroke variant (false)
 * @returns The React component for the icon, or undefined if not found
 */
export function getIcon(name: string, outlined: boolean = false): React.FunctionComponent<React.SVGAttributes<SVGElement>> | undefined {
  const icon = iconMap[name]
  if (!icon) return undefined

  return outlined ? icon.Fill : icon.Stroke
}