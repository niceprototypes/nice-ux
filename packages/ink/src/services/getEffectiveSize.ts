import { TypographyAsType } from "../types"

/**
 * Determines the effective font size fallback based on the HTML element type
 *
 * Provides appropriate default sizes for headings following a typographic scale:
 * - h1: 2rem (32px)
 * - h2: 1.5rem (24px)
 * - h3: 1.25rem (20px)
 * - h4: 1.125rem (18px)
 * - p, span: 1rem (16px)
 *
 * @param size - User-provided size
 * @param as - HTML element type
 * @returns Object with size default CSS variable and fallback value
 */
const getEffectiveSize = (
  size: string | undefined,
  as: TypographyAsType
): { sizeDefault: string; sizeFallback: string } => {
  // If user provided a size, use it directly
  if (size) {
    return {
      sizeDefault: size,
      sizeFallback: size,
    }
  }

  // Return appropriate defaults based on element type
  switch (as) {
    case "h1":
      return {
        sizeDefault: "var(--typography-size-h1)",
        sizeFallback: "2rem",
      }
    case "h2":
      return {
        sizeDefault: "var(--typography-size-h2)",
        sizeFallback: "1.5rem",
      }
    case "h3":
      return {
        sizeDefault: "var(--typography-size-h3)",
        sizeFallback: "1.25rem",
      }
    case "h4":
      return {
        sizeDefault: "var(--typography-size-h4)",
        sizeFallback: "1.125rem",
      }
    default:
      return {
        sizeDefault: "var(--typography-size-default)",
        sizeFallback: "1rem",
      }
  }
}

export default getEffectiveSize