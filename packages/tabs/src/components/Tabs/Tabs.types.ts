import type * as React from "react"
import type { GapType, SizeType, ThemeType } from "nice-react-styles"

/**
 * TabsItemType
 *
 * One tab. `label` is any node: a string, or an interactive node such as a ghost Input (the
 * tab is not a `<button>`, so it may contain one).
 */
export interface TabsItemType {
  /** Identifies the tab in `selected`, `defaultSelected` and `onSelect` */
  id: string
  /** Tab content */
  label: React.ReactNode
  /** The tab can't be selected or focused with the arrow keys */
  disabled?: boolean
}

/**
 * TabsItemsType
 *
 * The tabs, in order.
 */
export type TabsItemsType = TabsItemType[]

/**
 * TabsSelectedType
 *
 * id of the selected tab (controlled). Pair it with `onSelect`.
 */
export type TabsSelectedType = string

/**
 * TabsDefaultSelectedType
 *
 * id of the tab selected first (uncontrolled). Defaults to the first enabled tab.
 */
export type TabsDefaultSelectedType = string

/**
 * TabsSelectEventType
 *
 * The event that selected a tab: a click, or a key press on a tab.
 */
export type TabsSelectEventType = React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>

/**
 * TabsOnSelectType
 *
 * Selection handler: the selected tab's id first, then the event.
 */
export type TabsOnSelectType = (id: string, event: TabsSelectEventType) => void

/**
 * TabsEndType
 *
 * Content of the tab row after the last tab, such as an add button. Not a tab.
 */
export type TabsEndType = React.ReactNode

/**
 * TabsChildrenType
 *
 * The selected tab's panel content.
 */
export type TabsChildrenType = React.ReactNode

/**
 * TabsSizeType
 *
 * Re-export of SizeType from nice-styles.
 * Tab padding, gap and font size, from the `tabs.*` component tokens.
 *
 * Values:
 * - "smaller"
 * - "small"
 * - "base": default
 * - "large"
 * - "larger"
 */
export type TabsSizeType = SizeType

/**
 * TabsJustifyContentType
 *
 * Placement of the tab list, and the `end` content after it, along the tab row. The
 * nice-react-flex `FlexJustifyContentType` values, defined here so Tabs does not depend on
 * nice-react-flex. Unset: the tabs start at the row's start.
 *
 * Values:
 * - "flex-start": tabs, then `end`, at the start of the row
 * - "flex-end": tabs, then `end`, at the end of the row
 * - "center": tabs, then `end`, centred in the row
 * - "space-between": tabs at the start, `end` at the end
 * - "space-around": equal space around the tab list and `end`
 * - "space-evenly": equal space before, between and after the tab list and `end`
 */
export type TabsJustifyContentType = "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly"

/**
 * TabsGapType
 *
 * Re-export of GapType from nice-styles.
 * Gap between tabs, and between the tab list and `end`, from the `gap` core token. Unset:
 * the `tabs.gap` token for the size.
 *
 * Values:
 * - "none"
 * - "smaller"
 * - "small"
 * - "base"
 * - "large"
 * - "larger"
 */
export type TabsGapType = GapType

/**
 * TabsVariantType
 *
 * Tab look.
 *
 * Values:
 * - "underline": default. A bottom border under the row and an underline under the selected tab
 * - "pill": a rounded border on each tab, from the `tabs.pill.*` tokens: transparent at rest,
 *   the `hover` color on a hovered enabled tab, the `selected` color on the selected tab. No
 *   row border, no underline
 */
export type TabsVariantType = "underline" | "pill"

/**
 * TabsAriaLabelType
 *
 * Accessible name of the tab list.
 */
export type TabsAriaLabelType = string

/**
 * TabsClassNameType
 *
 * CSS class name applied to the root element.
 */
export type TabsClassNameType = string

/**
 * TabsThemeType
 *
 * Re-export of ThemeType from nice-styles.
 * Pin token resolution to a specific theme.
 */
export type TabsThemeType = ThemeType

/**
 * TabsProps
 *
 * Complete prop definition for the Tabs component: a WAI-ARIA tab list, optional content
 * after the tabs, and the selected tab's panel.
 */
export interface TabsProps {
  /** The tabs, in order */
  items: TabsItemsType
  /** id of the selected tab (controlled) */
  selected?: TabsSelectedType
  /** id of the tab selected first (uncontrolled) */
  defaultSelected?: TabsDefaultSelectedType
  /** Selection handler: id, then the event */
  onSelect?: TabsOnSelectType
  /** Content of the tab row after the last tab */
  end?: TabsEndType
  /** The selected tab's panel content */
  children?: TabsChildrenType
  /** Tab padding, gap and font size */
  size?: TabsSizeType
  /** Placement of the tab list and `end` along the tab row */
  justifyContent?: TabsJustifyContentType
  /** Gap between tabs, and between the tab list and `end`; overrides the size's gap */
  gap?: TabsGapType
  /** Tab look: an underline (default) or a rounded border per tab */
  variant?: TabsVariantType
  /** Accessible name of the tab list */
  "aria-label"?: TabsAriaLabelType
  /** CSS class name applied to the root element */
  className?: TabsClassNameType
  /** Pin token resolution to a specific theme */
  theme?: TabsThemeType
}

// Declaration merging: const + namespace creates exportable type namespace
const TabsTypes = {} as const

namespace TabsTypes {
  export type Item = TabsItemType
  export type Items = TabsItemsType
  export type Selected = TabsSelectedType
  export type DefaultSelected = TabsDefaultSelectedType
  export type SelectEvent = TabsSelectEventType
  export type OnSelect = TabsOnSelectType
  export type End = TabsEndType
  export type Children = TabsChildrenType
  export type Size = TabsSizeType
  export type JustifyContent = TabsJustifyContentType
  export type Gap = TabsGapType
  export type Variant = TabsVariantType
  export type AriaLabel = TabsAriaLabelType
  export type ClassName = TabsClassNameType
  export type Theme = TabsThemeType
  export type Props = TabsProps
}

export default TabsTypes
