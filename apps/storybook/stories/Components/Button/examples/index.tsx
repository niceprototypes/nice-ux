// The Button example configs now live in the central data surface
// `src/dataTables/data.tsx` (one place to survey every table). This barrel
// re-exports them so the Button/Docs page and the standalone Button/<facet>
// stories keep importing from `./examples`.
export type { ComponentExample, ExampleVariant } from "./examples.types"
export { buttonExamples, buttonExampleList } from "../../../../src/dataTables/data"
