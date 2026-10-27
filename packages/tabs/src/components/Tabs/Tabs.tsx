import * as React from "react"
import { Theme } from "nice-react-styles"
import { findTabIndex, type TabsNavigationKey } from "../../utilities/findTabIndex"
import { StyledRow, StyledTab, StyledTabList } from "./Tabs.styles"
import type { TabsProps, TabsSelectEventType } from "./Tabs.types"

const NAVIGATION_KEYS: string[] = ["ArrowRight", "ArrowLeft", "Home", "End"] satisfies TabsNavigationKey[]

/**
 * Tabs renders a WAI-ARIA tab list, optional `end` content after the tabs (such as an add
 * button), and the selected tab's panel (`children`). Tab labels may be any node, including
 * an input: tabs are not buttons, and keys pressed inside a label's own control stay with
 * that control.
 *
 * The selected tab is the only one in the tab order (roving tabindex). On a focused tab,
 * ArrowLeft / ArrowRight move to and select the previous / next enabled tab, wrapping; Home
 * and End go to the first and last; Enter and Space select.
 *
 * Controlled with `selected` + `onSelect`, or uncontrolled with `defaultSelected`.
 *
 * @example
 * ```tsx
 * <Tabs
 *   items={[{ id: "page-1", label: "Page 1" }, { id: "page-2", label: "Page 2" }]}
 *   selected={page}
 *   onSelect={setPage}
 *   end={<Button iconLeft="plus" aria-label="Add page" />}
 * >
 *   {panel}
 * </Tabs>
 * ```
 */
const Tabs: React.FC<TabsProps> = ({
  items,
  selected,
  defaultSelected,
  onSelect,
  end,
  children,
  size = "base",
  justifyContent,
  gap,
  variant = "underline",
  "aria-label": ariaLabel,
  className,
  theme,
}) => {
  const baseId = React.useId()
  const [ownSelected, setOwnSelected] = React.useState(
    () => defaultSelected ?? items.find(item => !item.disabled)?.id,
  )
  const selectedId = selected ?? ownSelected
  // The one tab in the tab order: the selected tab, or the first enabled one if it is disabled.
  const focusableId = items.some(item => item.id === selectedId && !item.disabled)
    ? selectedId
    : items.find(item => !item.disabled)?.id
  const tabRefs = React.useRef(new Map<string, HTMLDivElement>())

  const tabId = (id: string) => `${baseId}-tab-${id}`
  const panelId = `${baseId}-panel`

  const select = (id: string, event: TabsSelectEventType) => {
    if (selected === undefined) setOwnSelected(id)
    onSelect?.(id, event)
  }

  const onTabKeyDown = (index: number) => (event: React.KeyboardEvent<HTMLDivElement>) => {
    // Keys pressed inside a label's own control (e.g. arrow keys in an input) belong to it.
    if (event.target !== event.currentTarget) return
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      select(items[index].id, event)
      return
    }
    if (!NAVIGATION_KEYS.includes(event.key)) return
    event.preventDefault()
    const next = findTabIndex(items, index, event.key as TabsNavigationKey)
    if (next === -1) return
    tabRefs.current.get(items[next].id)?.focus()
    select(items[next].id, event)
  }

  const element = (
    <div className={className}>
      <StyledRow $size={size} $gap={gap} $justifyContent={justifyContent} $variant={variant}>
        <StyledTabList role="tablist" aria-label={ariaLabel} $size={size} $gap={gap}>
          {items.map((item, index) => {
            const isSelected = item.id === selectedId
            const disabled = !!item.disabled
            return (
              <StyledTab
                key={item.id}
                ref={node => {
                  if (node) tabRefs.current.set(item.id, node)
                  else tabRefs.current.delete(item.id)
                }}
                role="tab"
                id={tabId(item.id)}
                aria-selected={isSelected}
                aria-controls={isSelected ? panelId : undefined}
                aria-disabled={disabled || undefined}
                tabIndex={item.id === focusableId ? 0 : -1}
                onClick={event => {
                  if (!disabled) select(item.id, event)
                }}
                onKeyDown={onTabKeyDown(index)}
                $size={size}
                $selected={isSelected}
                $disabled={disabled}
                $variant={variant}
              >
                {item.label}
              </StyledTab>
            )
          })}
        </StyledTabList>
        {end}
      </StyledRow>
      {selectedId !== undefined && (
        <div role="tabpanel" id={panelId} aria-labelledby={tabId(selectedId)}>
          {children}
        </div>
      )}
    </div>
  )

  return theme ? <Theme name={theme}>{element}</Theme> : element
}

export default Tabs
