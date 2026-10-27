// The Flex example configs now live in the central data surface
// `src/dataTables/data.tsx` (one place to survey every table). This barrel
// re-exports them so the Flex/Docs page and the standalone Flex/<facet> stories
// keep importing from `./examples`.
export type { ComponentExample, ExampleVariant } from "./examples.types"
export { flexExamples, flexExampleList } from "../../../../src/dataTables/data"
