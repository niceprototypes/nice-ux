import { getConstant } from "@niceprototypes/styles"

/**
 * animationDuration demo — the dot's diameter, shared between the element size
 * and the slide distance so the dot stays flush inside the right edge.
 */
export const DOT_SIZE = "4px"

/** lineHeight demo copy. */
export const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."

/**
 * The local custom fontFamily token (set in src/nice/tokens.ts) →
 * var(--np--font-family--demo). Built with getConstant since "demo" isn't part
 * of the generated FontFamilyType, and Ink has no font-family prop.
 */
export const demoFont = getConstant("fontFamily", "demo")
