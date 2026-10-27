import type { TabsItemType } from "../components/Tabs/Tabs.types"

/** The key presses that move focus between tabs. */
export type TabsNavigationKey = "ArrowRight" | "ArrowLeft" | "Home" | "End"

/**
 * Index of the enabled tab a navigation key moves to from `from`: the next or previous
 * enabled tab (wrapping around), or the first or last enabled tab. Returns -1 when no tab
 * is enabled.
 */
export function findTabIndex(items: TabsItemType[], from: number, key: TabsNavigationKey): number {
  const enabled = items.map((item, index) => (item.disabled ? -1 : index)).filter(index => index !== -1)
  if (!enabled.length) return -1
  if (key === "Home") return enabled[0]
  if (key === "End") return enabled[enabled.length - 1]
  const step = key === "ArrowRight" ? 1 : -1
  for (let offset = 1; offset <= items.length; offset++) {
    const index = (from + step * offset + items.length) % items.length
    if (!items[index].disabled) return index
  }
  return -1
}
