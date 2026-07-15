// Data for the ComponentDemoTable — one file per example facet (each an
// `export const` config), for every component demoed (Button, Flex, …). Add a
// facet by dropping a new `{component}{Facet}.tsx` here and listing it in the
// relevant `{component}Examples` map below; key order is the Docs-page order.
import type { ComponentExample } from "../../../components/demos/Components"
import { buttonFilled } from "./buttonFilled"
import { buttonSize } from "./buttonSize"
import { buttonStatus } from "./buttonStatus"
import { buttonBorderRadius } from "./buttonBorderRadius"
import { buttonIcon } from "./buttonIcon"
import { buttonAs } from "./buttonAs"
import { flexDirection } from "./flexDirection"
import { flexGap } from "./flexGap"
import { flexPadding } from "./flexPadding"
import { flexAlignItems } from "./flexAlignItems"
import { flexJustifyContent } from "./flexJustifyContent"
import { flexGrow } from "./flexGrow"
import { flexWrap } from "./flexWrap"

export {
  buttonFilled,
  buttonSize,
  buttonStatus,
  buttonBorderRadius,
  buttonIcon,
  buttonAs,
  flexDirection,
  flexGap,
  flexPadding,
  flexAlignItems,
  flexJustifyContent,
  flexGrow,
  flexWrap,
}

/** Every Button example facet — key order is the Button/Docs-page order. */
export const buttonExamples = {
  filled: buttonFilled,
  size: buttonSize,
  status: buttonStatus,
  borderRadius: buttonBorderRadius,
  icon: buttonIcon,
  as: buttonAs,
} satisfies Record<string, ComponentExample>

/** Button facets in Docs-page order. */
export const buttonExampleList: ComponentExample[] = Object.values(buttonExamples)

/** Every Flex example facet — key order is the Flex/Docs-page order. */
export const flexExamples = {
  direction: flexDirection,
  gap: flexGap,
  padding: flexPadding,
  alignItems: flexAlignItems,
  justifyContent: flexJustifyContent,
  grow: flexGrow,
  wrap: flexWrap,
} satisfies Record<string, ComponentExample>

/** Flex facets in Docs-page order. */
export const flexExampleList: ComponentExample[] = Object.values(flexExamples)
