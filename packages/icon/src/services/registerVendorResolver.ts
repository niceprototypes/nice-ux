import type { VendorResolverType } from "./registerVendorResolver.types"

let resolver: VendorResolverType = null

/**
 * registerVendorResolver
 *
 * Registers a function that resolves icon names to vendor React components.
 * Called as a side effect by vendor packages (e.g. nice-react-icon-vendor).
 *
 * @param fn - Resolver function: takes an icon name, returns a component or null
 */
export function registerVendorResolver(fn: NonNullable<VendorResolverType>): void {
  resolver = fn
}

/**
 * getVendorIcon
 *
 * Internal. Resolves a name through the registered vendor resolver.
 * Returns null when no resolver is registered or the name is not found.
 *
 * @param name - Icon name
 */
export function getVendorIcon(name: string): React.ComponentType | null {
  // No resolver registered — vendor package not installed or not imported
  if (!resolver) return null
  return resolver(name)
}