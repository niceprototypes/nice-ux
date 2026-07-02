import type { ComponentExample } from "./examples.types"

import { alignItems } from "./alignItems"
import { direction } from "./direction"
import { gap } from "./gap"
import { grow } from "./grow"
import { justifyContent } from "./justifyContent"
import { spacing } from "./spacing"
import { typeExample } from "./type"
import { wrap } from "./wrap"

export type { ComponentExample, ExampleVariant } from "./examples.types"

/**
 * Single source of truth for every Flex example facet — one file per facet in
 * this folder. Both the Flex/Docs page and each standalone Flex/<facet> story
 * render from these configs, so the two never drift. Key order here is the order
 * facets appear on the Docs page.
 *
 * Mirrors Button's `examples/index.tsx` (`buttonExamples`) and the token
 * system's `tables/index.tsx`, so component examples and token tables share the
 * same config → render pipeline.
 */
export const flexExamples = {
  direction: direction,
  gap,
  spacing,
  alignItems,
  justifyContent,
  grow,
  wrap,
  type: typeExample,
} satisfies Record<string, ComponentExample>

/** Facets in Docs-page order. */
export const flexExampleList: ComponentExample[] = Object.values(flexExamples)
