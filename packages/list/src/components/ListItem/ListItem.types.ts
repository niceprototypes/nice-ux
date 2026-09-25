import * as React from "react"

/**
 * ListItemChildrenType
 *
 * The item's main content, rendered between the start and end slots.
 */
export type ListItemChildrenType = React.ReactNode

/**
 * ListItemStartType
 *
 * Content rendered before the main content (icon, avatar, checkbox).
 */
export type ListItemStartType = React.ReactNode

/**
 * ListItemEndType
 *
 * Content rendered after the main content (shortcut, badge, chevron).
 */
export type ListItemEndType = React.ReactNode

/**
 * ListItemSelectedType
 *
 * Visual selected state: `list.backgroundColor:selected` and
 * `list.color:selected`. Not mapped to ARIA — pass `aria-selected` yourself
 * when the pattern needs it.
 */
export type ListItemSelectedType = boolean

/**
 * ListItemActiveType
 *
 * Visual highlight (keyboard or pointer): `list.backgroundColor:active`.
 * Not mapped to ARIA.
 */
export type ListItemActiveType = boolean

/**
 * ListItemDisabledType
 *
 * Visual disabled state (`list.color:disabled`) plus `aria-disabled="true"`.
 * Event handlers are not suppressed.
 */
export type ListItemDisabledType = boolean

/**
 * ListItemOwnProps
 *
 * Props the ListItem component owns. Every other standard `<li>` attribute
 * (role, aria-*, data-*, id, event handlers) passes through to the root
 * element.
 */
export interface ListItemOwnProps {
  /** Main content */
  children?: ListItemChildrenType
  /** Content before the main content */
  start?: ListItemStartType
  /** Content after the main content */
  end?: ListItemEndType
  /** Visual selected state */
  selected?: ListItemSelectedType
  /** Visual highlight (keyboard or pointer) */
  active?: ListItemActiveType
  /** Visual disabled state plus aria-disabled */
  disabled?: ListItemDisabledType
  /** CSS class name applied to the root element */
  className?: string
  /** Ref to the `<li>` element */
  ref?: React.Ref<HTMLLIElement>
}

/**
 * ListItemProps
 *
 * Complete prop definition for the ListItem component: the owned props plus
 * every standard `<li>` attribute not owned by the component.
 */
export type ListItemProps = ListItemOwnProps & Omit<React.LiHTMLAttributes<HTMLLIElement>, keyof ListItemOwnProps>

// Declaration merging: const + namespace creates exportable type namespace
const ListItemTypes = {} as const

namespace ListItemTypes {
  export type Children = ListItemChildrenType
  export type Start = ListItemStartType
  export type End = ListItemEndType
  export type Selected = ListItemSelectedType
  export type Active = ListItemActiveType
  export type Disabled = ListItemDisabledType
  export type OwnProps = ListItemOwnProps
  export type Props = ListItemProps
}

export default ListItemTypes
