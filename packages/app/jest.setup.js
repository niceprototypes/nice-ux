import { TextDecoder, TextEncoder } from "node:util"

// jsdom lacks TextEncoder (React Router reads it at import) and scrollTo (TanStack Router restores scroll).
Object.assign(globalThis, { TextDecoder, TextEncoder })
window.scrollTo = () => {}
