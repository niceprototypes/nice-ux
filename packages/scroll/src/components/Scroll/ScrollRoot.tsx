import * as React from "react"
import { scrollTargetOf, scrollTopOf, type ScrollRootElement } from "../../utilities/scrollRoot"
import type { ScrollRootType } from "./Scroll.types"
import type { ScrollContextValue, ScrollSubscribeCallbackType, StickyContextValue, StickyInstance } from "./ScrollRoot.types"

/** The nearest root's scroll offset and element; null outside a root. */
export const ScrollContext = React.createContext<ScrollContextValue | null>(null)

/** The nearest root's sticky stack; null outside a root. */
export const StickyContext = React.createContext<StickyContextValue | null>(null)

/** The root's element: the window (null) for `true`, else the element or the ref's current element. */
const elementOf = (root: ScrollRootType): ScrollRootElement => (root === true ? null : "current" in root ? root.current : root)

/**
 * `<Scroll root>`: the page scroller the sticky and fade behaviours under it measure against. One
 * scroll listener, batched to one update per frame, feeds useScroll and every fade; the sticky
 * bars stack in order below the root's top.
 */
const ScrollRoot = ({ root, children }: { root: ScrollRootType; children?: React.ReactNode }) => {
  // Read after mount: a passive effect runs once every ref is attached. null is the window.
  const [element, setElement] = React.useState<ScrollRootElement>(null)
  React.useEffect(() => {
    setElement(elementOf(root))
  }, [root])
  const scrollYRef = React.useRef(0)
  const subscribersRef = React.useRef<Set<ScrollSubscribeCallbackType>>(new Set())
  const rafIdRef = React.useRef<number | null>(null)

  const subscribe = React.useCallback((callback: ScrollSubscribeCallbackType) => {
    subscribersRef.current.add(callback)
    callback(scrollYRef.current)
    return () => {
      subscribersRef.current.delete(callback)
    }
  }, [])

  React.useEffect(() => {
    const handleScroll = () => {
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = requestAnimationFrame(() => {
        scrollYRef.current = scrollTopOf(element)
        subscribersRef.current.forEach(callback => callback(scrollYRef.current))
        rafIdRef.current = null
      })
    }
    scrollYRef.current = scrollTopOf(element)
    const target = scrollTargetOf(element)
    target.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      target.removeEventListener("scroll", handleScroll)
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current)
    }
  }, [element])

  // The sticky stack: each bar's offset is the heights of the bars ordered above it.
  const instancesRef = React.useRef<StickyInstance[]>([])
  const updatePositions = React.useCallback(() => {
    let cumulativeOffset = 0
    instancesRef.current.forEach(instance => {
      instance.stickyTop = cumulativeOffset
      cumulativeOffset += instance.height
    })
  }, [])
  const sticky = React.useMemo<StickyContextValue>(
    () => ({
      registerInstance: (order, height) => {
        instancesRef.current = [...instancesRef.current.filter(instance => instance.order !== order), { order, height, stickyTop: 0 }].sort(
          (a, b) => a.order - b.order,
        )
        updatePositions()
        return instancesRef.current.find(instance => instance.order === order)?.stickyTop ?? 0
      },
      unregisterInstance: order => {
        instancesRef.current = instancesRef.current.filter(instance => instance.order !== order)
        updatePositions()
      },
      getStickyTop: order => instancesRef.current.find(instance => instance.order === order)?.stickyTop ?? 0,
      getTotalStickyHeight: () => instancesRef.current.reduce((total, instance) => total + instance.height, 0),
    }),
    [updatePositions],
  )

  const value: ScrollContextValue = { scrollY: scrollYRef.current, subscribe, root: element }

  return (
    <ScrollContext.Provider value={value}>
      <StickyContext.Provider value={sticky}>{children}</StickyContext.Provider>
    </ScrollContext.Provider>
  )
}

export default ScrollRoot
