import type { ComponentExample } from "./examples.types"

import { borderRadius } from "./borderRadius"
import { filled } from "./filled"
import { icon } from "./icon"
import { size } from "./size"
import { status } from "./status"

export type { ComponentExample, ExampleVariant } from "./examples.types"

/**
 * Single source of truth for every Button example facet — one file per facet in
 * this folder. Both the Button/Docs page and each standalone Button/<facet>
 * story render from these configs, so the two never drift. Key order here is the
 * order facets appear on the Docs page.
 *
 * Mirrors the token system's `tables/index.tsx` (`tokenTables`), so component
 * examples and token tables share the same config → render pipeline.
 */
export const buttonExamples = {
  filled,
  size,
  status,
  borderRadius,
  icon,
} satisfies Record<string, ComponentExample>

/** Facets in Docs-page order. */
export const buttonExampleList: ComponentExample[] = Object.values(buttonExamples)
