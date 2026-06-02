import React from "react"
import { ShikiCode } from "../ShikiCode"

interface InstallProps {
  /** Bare package suffix — renders as `nice-{package}`. E.g. `package="styles"` → `nice-styles`. */
  package: string
  /** Step number for the heading. Defaults to 1. */
  step?: number
}

const Install: React.FC<InstallProps> = ({ package: pkg, step = 1 }) => (
  <>
    <h3>{step}. Install</h3>
    <ShikiCode language="bash" code={`npm i nice-${pkg}`} />
  </>
)

export default Install
