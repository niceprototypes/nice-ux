import * as React from "react"
import type { FieldContextValue } from "./Field.types"

/**
 * FieldContext
 *
 * Provided by `Field`; `null` outside a Field. Read it with `useField()`.
 */
export const FieldContext = React.createContext<FieldContextValue | null>(null)
