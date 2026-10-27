type ResolverInput = {
  src?: string
  width?: string
  height?: string
}

/**
 * Parse a CSS length string into a pixel integer.
 * Returns the fallback when the value is missing or not parseable.
 */
function parsePxOrFallback(value: string | undefined, fallback: number): number {
  if (!value) return fallback
  const n = parseInt(value, 10)
  return Number.isFinite(n) && n > 0 ? n : fallback
}

const DEFAULT_WIDTH = 800
const DEFAULT_HEIGHT = 600

/**
 * resolveVendorImage
 *
 * Resolves Image props to a picsum.photos URL.
 *
 * - `src` is treated as the picsum id. Omit it for a random image.
 * - `width` / `height` are parsed as pixel integers (defaults: 800 × 600).
 *
 * @param input - The relevant Image props (src, width, height)
 */
export function resolveVendorImage(input: ResolverInput): string {
  const width = parsePxOrFallback(input.width, DEFAULT_WIDTH)
  const height = parsePxOrFallback(input.height, DEFAULT_HEIGHT)

  // Treat src as a picsum id when provided; otherwise let picsum return a random image
  const id = input.src && input.src.length > 0 ? input.src : null

  return id !== null
    ? `https://picsum.photos/id/${id}/${width}/${height}`
    : `https://picsum.photos/${width}/${height}`
}
