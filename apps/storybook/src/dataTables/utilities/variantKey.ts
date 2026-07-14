/**
 * A row's identity — the bare variant string, or the `variant` field of a
 * variant object. Shared by the token tables and the component demo tables,
 * which use the same `string | { variant }` row shape.
 */
export const variantKey = (item: string | { variant: string }): string =>
  typeof item === "string" ? item : item.variant
