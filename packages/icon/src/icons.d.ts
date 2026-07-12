// SVGR-transformed SVG imports resolve to React components. The `nice-icons`
// module itself now ships generated types (nice-icons/index.d.ts), so it is no
// longer declared here — that avoids shadowing the real, always-current types.
declare module "*.svg" {
  import * as React from "react"
  const ReactComponent: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default ReactComponent
}