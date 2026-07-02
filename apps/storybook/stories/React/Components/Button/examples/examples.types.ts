// The canonical component-example config type now lives in the shared
// src/components/DataTable/tables/ComponentTable module (generalized for any React component).
// This re-export keeps the local import path stable for the per-facet configs
// in this folder.
export type { ComponentExample, ExampleVariant } from "../../../../../src/components/DataTable/tables/ComponentTable"
