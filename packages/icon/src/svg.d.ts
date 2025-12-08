declare module "*.svg" {
  import * as React from "react"
  const ReactComponent: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default ReactComponent
}

declare module "nice-icons/*" {
  import * as React from "react"
  const ReactComponent: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default ReactComponent
}
