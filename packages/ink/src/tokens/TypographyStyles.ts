import type { ComponentType } from "react"

/**
 * No-op component — typography CSS custom properties are now generated
 * at build time in nice-styles dist/variables.css.
 * Kept for backward compatibility.
 */
export const TypographyStyles: ComponentType = () => null