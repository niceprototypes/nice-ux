import React from "react"
import { ShikiCode } from "../ShikiCode"

interface InstallProps {
  /** Bare package suffix — renders as `nice-{package}`. E.g. `package="styles"` → `nice-styles`. */
  package: string
  /** Step number for the heading. Defaults to 1. */
  step?: number
  /** Whether to render the "{step}. Install" heading. Defaults to true. */
  showTitle?: boolean
}

const Install: React.FC<InstallProps> = ({ package: pkg, step = 1, showTitle = true }) => (
  <>
    {showTitle && <h3>{step}. Install</h3>}
    <ShikiCode language="bash" code={`npm i nice-${pkg}`} />
  </>
)

export default Install
