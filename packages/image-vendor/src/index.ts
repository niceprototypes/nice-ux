import { registerVendorResolver } from "@niceprototypes/image"
import { resolveVendorImage } from "./services"

// Side-effect registration — importing this package activates vendor image resolution
registerVendorResolver(resolveVendorImage)

export { resolveVendorImage }
