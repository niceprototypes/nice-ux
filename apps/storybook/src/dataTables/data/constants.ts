import { getConstant } from "nice-react-styles"

/**
 * animationDuration demo — the dot's diameter, shared between the element size
 * and the slide distance so the dot stays flush inside the right edge.
 */
export const DOT_SIZE = "4px"

/**
 * zIndex demo — a neutral reference layer the variant square stacks against,
 * fixed between the `low` (10) and `medium` (100) tiers so scanning the rows
 * shows the accent square cross from behind to in front of it.
 */
export const REFERENCE_Z = 50

/** lineHeight demo copy. */
export const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."

/**
 * The local custom fontFamily token (set in src/nice/tokens.ts) →
 * var(--np--font-family--demo). Built with getConstant since "demo" isn't part
 * of the generated FontFamilyType, and Typography has no font-family prop.
 */
export const demoFont = getConstant("fontFamily", "demo")
