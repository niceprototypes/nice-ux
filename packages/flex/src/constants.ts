/**
 * Breakpoint Constants
 * 
 * Defines the responsive breakpoint system used throughout the Flex component.
 * These values determine when different responsive styles are applied.
 */

/** Small breakpoint - mobile devices */
export const BREAKPOINT_SM = 480

/** Medium breakpoint - tablets and small desktops */
export const BREAKPOINT_MD = 980

/** Large breakpoint - large desktops */
export const BREAKPOINT_LG = 1280

/**
 * Media Queries
 * 
 * Pre-built media query strings for responsive design.
 * These are used in styled-components to apply styles at different screen sizes.
 */

/** Media query for medium screens and up (tablets+) */
export const MEDIA_MIN_MD = `@media (min-width: ${BREAKPOINT_MD}px)`

/** Media query for large screens and up (desktops+) */
export const MEDIA_MIN_LG = `@media (min-width: ${BREAKPOINT_LG}px)`