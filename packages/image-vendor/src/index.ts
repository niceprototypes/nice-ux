import { registerVendorResolver } from "nice-react-image"
import { resolveVendorImage } from "./services"

// Side-effect registration — importing this package activates vendor image resolution
registerVendorResolver(resolveVendorImage)

export { resolveVendorImage }
