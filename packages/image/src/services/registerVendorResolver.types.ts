/**
 * ImageVendorResolverInputType
 *
 * Shape passed to a vendor image resolver. The resolver inspects these fields
 * to compute a concrete URL — e.g. picsum needs numeric width/height parsed
 * from the CSS strings; a CDN loader might use src as a media key.
 */
export type ImageVendorResolverInputType = {
  src?: string
  width?: string
  height?: string
}

/**
 * ImageVendorResolverType
 *
 * Function signature for vendor image resolvers. Takes the relevant Image props
 * and returns a URL string. Returns null to defer to the default rendering path.
 */
export type ImageVendorResolverType =
  | ((input: ImageVendorResolverInputType) => string | null)
  | null
