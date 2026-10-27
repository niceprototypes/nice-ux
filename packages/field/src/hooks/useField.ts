import * as React from "react"
import { FieldContext } from "../components/Field/FieldContext"
import type { FieldContextValue } from "../components/Field/Field.types"

/**
 * useField
 *
 * Reads the enclosing `Field`'s wiring. Returns `null` outside a Field.
 *
 * A control inside a Field must:
 * - render `id` as its own `id` (the label's `htmlFor` points at it)
 * - render `aria-describedby={mergeDescribedBy(field.describedBy, ownDescribedBy)}`
 * - render `aria-invalid="true"` only when `invalid` is true (never `"false"`)
 * - render native `required` when `required` is true
 */
export function useField(): FieldContextValue | null {
  return React.useContext(FieldContext)
}
