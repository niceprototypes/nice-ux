import * as React from "react"
import NiceCode, { type CodeProps } from "nice-react-code"
import type { WithBreakpointsProps } from "nice-react-styles"
import { CodeFlex } from "./Code.styles"

type StorybookCodeProps = WithBreakpointsProps<CodeProps> & {
  /** Cap the block at the content width (ContentFlex `wrapped`). Ignored when `inlined`. @default true */
  wrapped?: boolean
}

/**
 * nice-react-code's Code inside a ContentFlex, so storybook code blocks are
 * capped at the content width by default. An `inlined` Code renders
 * `inline-flex` and is never wrapped — a capped wrapper is full width, which
 * would pull it out of its line of text or heading.
 */
const Code: React.FC<StorybookCodeProps> = ({ wrapped = true, ...props }) => (
  <CodeFlex inlined={props.inlined} wrapped={wrapped && !props.inlined}>
    <NiceCode {...props} />
  </CodeFlex>
)

export default Code
