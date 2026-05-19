import type { ComponentType } from "react"

/**
 * No-op component — input CSS custom properties are generated at build
 * time in nice-styles dist/tokens.css. Kept for backward compatibility
 * with the StylesProvider componentStyles convention.
 */
export const InputStyles: ComponentType = () => null