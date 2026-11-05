/**
 * True in non-production builds. Reads `process.env.NODE_ENV`, which consumer
 * bundlers replace statically. Where `process` is undefined and was not
 * replaced (a raw browser runtime), the ReferenceError is caught and this
 * returns false, so dev-only code never throws.
 *
 * @returns Whether dev-only diagnostics should run
 */
export function isDevelopment(): boolean {
  try {
    return process.env.NODE_ENV !== "production"
  } catch {
    return false
  }
}
