import * as React from "react"
import type { ListContextValue } from "./List.types"

/**
 * ListContext
 *
 * Carries the List's `size` to its ListItems. A ListItem rendered outside a
 * List falls back to the default ("base").
 */
export const ListContext = React.createContext<ListContextValue>({ size: "base" })
