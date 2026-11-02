import { getConstant } from "@niceprototypes/styles"

/**
 * The CSS-variable doc string for one variant, built with the real `getConstant`
 * generator so it always matches the emitted token name; `base` is the implicit
 * default and carries no segment.
 */
export const tokenCode = (group: string, variant: string, theme?: string): { cssVar: string } => ({
  cssVar: getConstant(group, variant, theme ? { theme } : undefined),
})
