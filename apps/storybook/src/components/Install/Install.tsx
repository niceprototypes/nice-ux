import React from "react"
import { CodeBlock } from "../CodeBlock"

interface InstallProps {
  /** Bare package suffix — renders as `nice-{package}`. E.g. `package="styles"` → `nice-styles`. */
  package: string
}

const Install: React.FC<InstallProps> = ({ package: pkg }) => (
  <CodeBlock language="bash" code={`npm i nice-${pkg}`} />
)

export default Install
