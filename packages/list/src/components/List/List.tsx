import * as React from "react"
import { Theme } from "@niceprototypes/styles"
import { ListContext } from "./ListContext"
import { StyledList, StyledListDivider, StyledListDividerRule } from "./List.styles"
import type { ListProps } from "./List.types"

/**
 * List
 *
 * Generic `<ul>` list. A divider `<hr>` is rendered between each pair of
 * adjacent rendered children — never before the first or after the last.
 * Each divider sits in `<li aria-hidden="true" role="presentation">`, since
 * an `<hr>` is not a valid direct child of `<ul>`. `size` reaches every
 * ListItem through context. Standard `<ul>` attributes (role, aria-*,
 * data-*, handlers) pass through to the root.
 *
 * @example
 * ```tsx
 * <List>
 *   <ListItem start={<Icon name="home" />}>Home</ListItem>
 *   <ListItem end="⌘S">Settings</ListItem>
 * </List>
 * ```
 */
const List: React.FC<ListProps> = ({
  children,
  scrollable = false,
  size = "base",
  className,
  theme,
  ref,
  ...rest
}) => {
  const contextValue = React.useMemo(() => ({ size }), [size])

  // toArray drops null / undefined / boolean children, so dividers are
  // counted from the children that actually render.
  const items = React.Children.toArray(children)

  const list = (
    <ListContext.Provider value={contextValue}>
      <StyledList {...rest} ref={ref} className={className} $scrollable={scrollable}>
        {items.map((item, index) => {
          const key = React.isValidElement(item) && item.key !== null ? item.key : index
          return (
            <React.Fragment key={key}>
              {index > 0 ? (
                <StyledListDivider aria-hidden="true" role="presentation">
                  <StyledListDividerRule />
                </StyledListDivider>
              ) : null}
              {item}
            </React.Fragment>
          )
        })}
      </StyledList>
    </ListContext.Provider>
  )

  return theme ? <Theme name={theme}>{list}</Theme> : list
}

export default List
