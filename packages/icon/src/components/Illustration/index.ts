import { withBreakpoints } from "nice-react-styles"
import BaseIllustration from "./Illustration"
import type { IllustrationProps } from "./Illustration.types"

const Illustration = withBreakpoints<IllustrationProps>(BaseIllustration)

export default Illustration
// Named self-export so the package root's `export * from "./components/Illustration"`
// (generated) surfaces `Illustration` as a named export — Icon is the package
// default, Illustration is imported by name: `import { Illustration } from "nice-react-icon"`.
export { Illustration }
export * from "./Illustration.types"
export { default as IllustrationTypes } from "./Illustration.types"
