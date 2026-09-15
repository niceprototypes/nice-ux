import React from "react"
import Code from "../../nice/Code"

interface InstallProps {
  /** Bare package suffix — renders as `nice-{package}`. E.g. `package="styles"` → `nice-styles`. */
  package: string
  /**
   * Additional non-nice packages installed alongside, appended verbatim (no
   * `nice-` prefix). Space-separate for several. E.g. `with="styled-components"`
   * → `npm i nice-{package} styled-components`.
   */
  with?: string
  /** Install as a dev dependency — renders `npm i -D nice-{package}`. @default false */
  dev?: boolean
  /** Strip the card chrome so the command sits flush inline. Forwarded to CodeBlock. @default false */
  inlined?: boolean
}

const Install: React.FC<InstallProps> = ({ package: pkg, with: peers, dev = false, inlined = false }) => (
  <Code
    fit
    inlined={inlined}
    language="bash"
    code={`npm i ${dev ? "-D " : ""}nice-${pkg}${peers ? ` ${peers}` : ""}`}
  />
)

export default Install
