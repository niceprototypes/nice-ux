// The Button example configs now live in the central data surface
// `src/dataTables/data.tsx` (one place to survey every table). This barrel
// re-exports them so the Button docs page keeps importing from `./examples`.
export type { ComponentExample, ExampleVariant } from "./examples.types"
export { buttonExamples } from "@niceprototypes/docs/dataTables/data"
