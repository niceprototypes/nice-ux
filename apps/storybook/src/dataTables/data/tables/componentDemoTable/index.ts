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
import { buttonJustifyContent } from "./buttonJustifyContent"
import { buttonGhost } from "./buttonGhost"
import { buttonSelected } from "./buttonSelected"
import { buttonIconColor } from "./buttonIconColor"
import { buttonColor } from "./buttonColor"
import { buttonAnimationDuration } from "./buttonAnimationDuration"
import { buttonAs } from "./buttonAs"
import { buttonOnClick } from "./buttonOnClick"
import { buttonChildren } from "./buttonChildren"
import { buttonType } from "./buttonType"
import { buttonDisabled } from "./buttonDisabled"
import { buttonPadding } from "./buttonPadding"
import { buttonGrow } from "./buttonGrow"
import { buttonWeight } from "./buttonWeight"
import { buttonAntialiased } from "./buttonAntialiased"
import { buttonBorderWidth } from "./buttonBorderWidth"
import { buttonBorderColor } from "./buttonBorderColor"
import { buttonBackgroundImage } from "./buttonBackgroundImage"
import { buttonTheme } from "./buttonTheme"
import { buttonOnMouseEnter } from "./buttonOnMouseEnter"
import { buttonOnMouseLeave } from "./buttonOnMouseLeave"
import { buttonTarget } from "./buttonTarget"
import { buttonForm } from "./buttonForm"
import { buttonAriaLabel } from "./buttonAriaLabel"
import { buttonAriaExpanded } from "./buttonAriaExpanded"
import { buttonAriaHasPopup } from "./buttonAriaHasPopup"
import { buttonAriaControls } from "./buttonAriaControls"
import { buttonAriaCurrent } from "./buttonAriaCurrent"
import { flexDirection } from "./flexDirection"
import { flexGap } from "./flexGap"
import { flexPadding } from "./flexPadding"
import { flexAlignItems } from "./flexAlignItems"
import { flexJustifyContent } from "./flexJustifyContent"
import { flexGrow } from "./flexGrow"
import { flexWrap } from "./flexWrap"
import { flexAs } from "./flexAs"
import { flexShrink } from "./flexShrink"
import { flexFit } from "./flexFit"
import { flexInlined } from "./flexInlined"
import { flexMargin } from "./flexMargin"
import { flexHeight } from "./flexHeight"
import { flexChildren } from "./flexChildren"

export {
  buttonFilled,
  buttonSize,
  buttonStatus,
  buttonBorderRadius,
  buttonIcon,
  buttonJustifyContent,
  buttonGhost,
  buttonSelected,
  buttonIconColor,
  buttonColor,
  buttonAnimationDuration,
  buttonAs,
  buttonOnClick,
  buttonChildren,
  buttonType,
  buttonDisabled,
  buttonPadding,
  buttonGrow,
  buttonWeight,
  buttonAntialiased,
  buttonBorderWidth,
  buttonBorderColor,
  buttonBackgroundImage,
  buttonTheme,
  buttonOnMouseEnter,
  buttonOnMouseLeave,
  buttonTarget,
  buttonForm,
  buttonAriaLabel,
  buttonAriaExpanded,
  buttonAriaHasPopup,
  buttonAriaControls,
  buttonAriaCurrent,
  flexDirection,
  flexGap,
  flexPadding,
  flexAlignItems,
  flexJustifyContent,
  flexGrow,
  flexWrap,
  flexAs,
  flexShrink,
  flexFit,
  flexInlined,
  flexMargin,
  flexHeight,
  flexChildren,
}

/** Every Button example facet — key order is the Button/Docs-page order. */
export const buttonExamples = {
  filled: buttonFilled,
  size: buttonSize,
  status: buttonStatus,
  borderRadius: buttonBorderRadius,
  icon: buttonIcon,
  justifyContent: buttonJustifyContent,
  ghost: buttonGhost,
  selected: buttonSelected,
  iconColor: buttonIconColor,
  color: buttonColor,
  animationDuration: buttonAnimationDuration,
  as: buttonAs,
  onClick: buttonOnClick,
  children: buttonChildren,
  type: buttonType,
  disabled: buttonDisabled,
  padding: buttonPadding,
  grow: buttonGrow,
  weight: buttonWeight,
  antialiased: buttonAntialiased,
  borderWidth: buttonBorderWidth,
  borderColor: buttonBorderColor,
  backgroundImage: buttonBackgroundImage,
  theme: buttonTheme,
  onMouseEnter: buttonOnMouseEnter,
  onMouseLeave: buttonOnMouseLeave,
  target: buttonTarget,
  form: buttonForm,
  ariaLabel: buttonAriaLabel,
  ariaExpanded: buttonAriaExpanded,
  ariaHasPopup: buttonAriaHasPopup,
  ariaControls: buttonAriaControls,
  ariaCurrent: buttonAriaCurrent,
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
  as: flexAs,
  shrink: flexShrink,
  fit: flexFit,
  inlined: flexInlined,
  margin: flexMargin,
  height: flexHeight,
  children: flexChildren,
} satisfies Record<string, ComponentExample>

/** Flex facets in Docs-page order. */
export const flexExampleList: ComponentExample[] = Object.values(flexExamples)
