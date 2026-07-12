/**
 * Determines if the icon should spin (spinner icon). Accepts any string, since
 * the Icon `name` prop is open (custom names are allowed).
 */
export function isSpinning(name: string): boolean {
  return name === "spinner"
}
