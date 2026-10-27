import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "@niceprototypes/styles"
import BaseFieldset from "./Fieldset"
import type { FieldsetProps } from "./Fieldset.types"

// Explicit return-type annotation — without it, TS declaration emit can leave an
// unbound generic `<P>` in dist or collapse to `any`, erasing the `breakpoints`
// prop on consumers. Mirrors the standard bearer (@niceprototypes/ink).
const Fieldset: React.FC<WithBreakpointsProps<FieldsetProps>> = withBreakpoints<FieldsetProps>(BaseFieldset)

export { Fieldset }
export * from "./Fieldset.types"
export { default as FieldsetTypes } from "./Fieldset.types"
