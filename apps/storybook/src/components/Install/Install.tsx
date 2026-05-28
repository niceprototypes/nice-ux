import React from "react"
import { Source } from "@storybook/addon-docs/blocks"

interface InstallProps {
  /** Bare package suffix — renders as `nice-{package}`. E.g. `package="styles"` → `nice-styles`. */
  package: string
  /** Step number for the heading. Defaults to 1. */
  step?: number
}

const Install: React.FC<InstallProps> = ({ package: pkg, step = 1 }) => (
  <>
    <h3>{step}. Install</h3>
    <Source language="bash" code={`npm install nice-${pkg}`} />
  </>
)

export default Install
