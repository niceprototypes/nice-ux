import type { ComponentExample } from "../dataTables/components/demos/Components"

/** One component's live examples, by facet (Button's `size`, `icon`, …): a prop name where the facet is one prop. */
export type ComponentExamplesType = Record<string, ComponentExample>

/** Every `examples/<Component>/index.tsx`, loaded with the docs bundle. */
const modules = import.meta.glob<Record<string, unknown>>("./*/index.tsx", { eager: true })

/**
 * Every component's examples by component name: each folder's `{component}Examples` export
 * (`examples/Button` → `buttonExamples`). A new folder is picked up without an entry here.
 */
export const componentExamples: Record<string, ComponentExamplesType> = Object.fromEntries(
  Object.entries(modules).flatMap(([path, module]) => {
    const name = path.split("/")[1]
    const examples = module[`${name.charAt(0).toLowerCase()}${name.slice(1)}Examples`]
    return examples ? [[name, examples as ComponentExamplesType]] : []
  }),
)
