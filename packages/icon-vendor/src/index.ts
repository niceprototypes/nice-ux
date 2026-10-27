import { registerVendorResolver } from "@niceprototypes/icon"
import { resolveVendorIcon } from "./services"

// Side-effect registration — importing this package activates vendor icon resolution
registerVendorResolver(resolveVendorIcon)

export { resolveVendorIcon }