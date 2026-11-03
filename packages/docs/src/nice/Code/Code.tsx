import * as React from "react"
import NiceCode, { type CodeProps } from "@niceprototypes/code"
import type { WithBreakpointsProps } from "@niceprototypes/styles"
import { CodeFlex } from "./Code.styles"

type StorybookCodeProps = WithBreakpointsProps<CodeProps>

/**
 * @niceprototypes/code's Code inside a ContentFlex, with no width cap of its own: a block runs
 * the full width of its column, edge to edge with the column's rules. An `inlined` Code renders
 * `inline-flex` in its line of text or heading.
 */
const Code: React.FC<StorybookCodeProps> = props => (
  <CodeFlex inlined={props.inlined}>
    <NiceCode {...props} />
  </CodeFlex>
)

export default Code
