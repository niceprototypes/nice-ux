import * as React from "react"
import NiceCode, { type CodeProps } from "nice-react-code"
import type { WithBreakpointsProps } from "nice-react-styles"
import { CodeFlex } from "./Code.styles"

/** nice-react-code's Code inside CodeFlex, so storybook code blocks size to `contentMaxWidth`. */
const Code: React.FC<WithBreakpointsProps<CodeProps>> = props => (
  <CodeFlex>
    <NiceCode {...props} />
  </CodeFlex>
)

export default Code
