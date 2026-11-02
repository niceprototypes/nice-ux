import type { ReactNode } from "react"
import { tokenRenderers } from "./tokens"

/** Renders one table cell or preview from its row value. */
export type Renderer = (value: any) => ReactNode

/**
 * Every renderer the data references, keyed by the id of the item that uses it
 * (its sanitized path). An item only names a renderer (`"preview": "…"`) when it
 * shares one with another item. One file per area.
 */
export const renderers: Record<string, Renderer> = {
  ...tokenRenderers,
}
