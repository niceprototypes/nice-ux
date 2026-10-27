import type {
  ImageVendorResolverInputType,
  ImageVendorResolverType,
} from "./registerVendorResolver.types"

let resolver: ImageVendorResolverType = null

/**
 * registerVendorResolver
 *
 * Registers a function that resolves Image props into a concrete image URL.
 * Called as a side effect by vendor packages (e.g. nice-react-image-vendor).
 *
 * @param fn - Resolver function: takes the relevant Image props, returns a URL or null
 */
export function registerVendorResolver(
  fn: NonNullable<ImageVendorResolverType>
): void {
  resolver = fn
}

/**
 * getVendorImage
 *
 * Internal. Routes Image props through the registered vendor resolver.
 * Returns null when no resolver is registered or the resolver opts out.
 */
export function getVendorImage(
  input: ImageVendorResolverInputType
): string | null {
  // No resolver registered — vendor package not installed or not imported
  if (!resolver) return null
  return resolver(input)
}
