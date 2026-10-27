import React from "react"
import Code from "../../nice/Code"

interface InstallProps {
  /** Package name without the scope — renders as `@niceprototypes/{package}`. E.g. `package="styles"` → `@niceprototypes/styles`. */
  package: string
  /**
   * Additional non-nice packages installed alongside, appended verbatim (no
   * scope). Space-separate for several. E.g. `with="styled-components"`
   * → `npm i @niceprototypes/{package} styled-components`.
   */
  with?: string
  /** Install as a dev dependency — renders `npm i -D @niceprototypes/{package}`. @default false */
  dev?: boolean
  /** Strip the card chrome so the command sits flush inline. Forwarded to CodeBlock. @default false */
  inlined?: boolean
}

const Install: React.FC<InstallProps> = ({ package: pkg, with: peers, dev = false, inlined = false }) => (
  <Code
    fit
    inlined={inlined}
    language="bash"
    code={`npm i ${dev ? "-D " : ""}@niceprototypes/${pkg}${peers ? ` ${peers}` : ""}`}
  />
)

export default Install
