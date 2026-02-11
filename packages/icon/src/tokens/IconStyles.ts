import type { ComponentType } from "react"

/**
 * No-op component — icon CSS custom properties are now generated
 * at build time in nice-styles dist/variables.css.
 * Kept for backward compatibility.
 */
export const IconStyles: ComponentType = () => null