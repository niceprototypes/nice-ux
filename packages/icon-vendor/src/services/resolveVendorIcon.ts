import { icons } from "lucide-react"

/**
 * resolveVendorIcon
 *
 * Resolves an icon name to a Lucide React component.
 * Consumers must use Lucide's native PascalCase names (e.g. "TrendingDown").
 * Returns null when the name does not match any Lucide icon.
 *
 * @param name - Lucide icon name in PascalCase (e.g. "TrendingDown")
 */
export function resolveVendorIcon(name: string): React.ComponentType | null {
  const icon = icons[name as keyof typeof icons]
  return icon ?? null
}