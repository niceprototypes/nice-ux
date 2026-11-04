/**
 * @niceprototypes/scroll - Performance-optimized scroll components for React
 *
 * @description
 * Scroll: every scrolling element, and the page behaviours (root, sticky, fade) as its props,
 * with centralized scroll management; useScroll; StickySection and StickySectionLinks.
 * Designed to work seamlessly with the nice-react ecosystem.
 *
 * @author Nice Prototypes
 * @version 2.1.0
 * @license MIT
 */

// The scroll container and the page behaviours
export { default as Scroll, ScrollTypes } from "./components/Scroll"
export type {
  ScrollProps,
  ScrollAxisType,
  ScrollAsType,
  ScrollRootType,
  ScrollStickyOptionsType,
  ScrollFadeOptionsType,
} from "./components/Scroll"

// Hooks
export { useScroll } from "./hooks/useScroll"

// Components
export {
  StickySectionLinks,
  SectionLinksTypes,
} from "./components/SectionLinks"
export type {
  StickySectionLinksProps,
  StickySectionLink,
  StickySectionLinksRenderLinkType,
  StickySectionLinksRenderWrapperType,
} from "./components/SectionLinks"

export { StickySection, StickySectionTypes } from "./components/StickySection"
export type {
  StickySectionProps,
  StickySectionElementType,
  StickySectionRenderProps,
  StickySectionRenderType,
} from "./components/StickySection"