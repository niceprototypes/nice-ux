import { getConstant } from "@niceprototypes/styles"

/**
 * The CSS-variable and getToken() doc strings for one variant. The CSS var is
 * built with the real `getConstant` generator so it always matches the emitted
 * token name; `base` is the implicit default and carries no segment. For
 * getToken() the variant is the second positional argument and `theme` stays in
 * the trailing options object.
 */
export const tokenCode = (group: string, variant: string, theme?: string): { cssVar: string; jsCall: string } => {
  const cssVar = getConstant(group, variant, theme ? { theme } : undefined)
  // Emit the positional variant when non-base, or when a theme follows it (the
  // variant must be present to reach the options argument).
  const variantArg = variant !== "base" || theme ? `, "${variant}"` : ""
  const optionsArg = theme ? `, { theme: "${theme}" }` : ""
  return { cssVar, jsCall: `getToken("${group}"${variantArg}${optionsArg})` }
}
