// SVGR-transformed SVG imports resolve to React components. The `@niceprototypes/icon/svg`
// module itself now ships generated types (@niceprototypes/icon/index.d.ts), so it is no
// longer declared here — that avoids shadowing the real, always-current types.
declare module "*.svg" {
  import * as React from "react"
  const ReactComponent: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default ReactComponent
}