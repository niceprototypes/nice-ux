import type * as React from "react"

/**
 * VendorResolverType
 *
 * Function signature for vendor icon resolvers.
 * Takes an icon name and returns a React component or null.
 */
export type VendorResolverType = ((name: string) => React.ComponentType | null) | null
