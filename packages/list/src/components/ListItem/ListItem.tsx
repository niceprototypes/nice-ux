import * as React from "react"
import { ListContext } from "../List/ListContext"
import {
  StyledListItem,
  StyledListItemContent,
  StyledListItemEnd,
  StyledListItemStart,
} from "./ListItem.styles"
import type { ListItemProps } from "./ListItem.types"

/**
 * ListItem
 *
 * One `<li>` row: optional `start` slot, content, optional `end` slot.
 * Padding follows the parent List's `size`. `selected` and `active` are
 * visual states only; `disabled` also sets `aria-disabled="true"`. Standard
 * `<li>` attributes (role, aria-*, data-*, handlers) pass through to the root.
 *
 * @example
 * ```tsx
 * <ListItem start={<Icon name="user" />} end="3" selected>
 *   Profile
 * </ListItem>
 * ```
 */
const ListItem: React.FC<ListItemProps> = ({
  children,
  start,
  end,
  selected = false,
  active = false,
  disabled = false,
  className,
  ref,
  ...rest
}) => {
  const { size } = React.useContext(ListContext)
  const hasStart = start !== undefined && start !== null && start !== false
  const hasEnd = end !== undefined && end !== null && end !== false

  return (
    <StyledListItem
      {...rest}
      ref={ref}
      className={className}
      aria-disabled={disabled ? "true" : rest["aria-disabled"]}
      $size={size}
      $selected={selected}
      $active={active}
      $disabled={disabled}
    >
      {hasStart ? <StyledListItemStart>{start}</StyledListItemStart> : null}
      <StyledListItemContent>{children}</StyledListItemContent>
      {hasEnd ? <StyledListItemEnd>{end}</StyledListItemEnd> : null}
    </StyledListItem>
  )
}

export default ListItem
