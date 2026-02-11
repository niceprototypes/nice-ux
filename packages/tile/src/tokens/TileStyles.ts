import type { ComponentType } from "react"

/**
 * No-op component — tile CSS custom properties are now generated
 * at build time in nice-styles dist/variables.css.
 * Kept for backward compatibility.
 */
export const TileStyles: ComponentType = () => null