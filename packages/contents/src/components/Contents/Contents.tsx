import * as React from "react"
import Ink from "@niceprototypes/ink"
import {
  StyledContents,
  StyledContentsItem,
  StyledContentsLink,
  StyledContentsList,
} from "./Contents.styles"
import type { ContentsItemsType, ContentsProps } from "./Contents.types"
import { getContentsIds } from "../../utilities/getContentsIds"
import { getSpiedId } from "../../utilities/getSpiedId"

/** Input that hands scrolling back to the user and so ends a click's scroll-spy hold. */
const USER_SCROLL_EVENTS = ["wheel", "touchstart", "keydown"] as const

/**
 * Contents
 *
 * The in-page table of contents beside a long page: a `<nav>` (named "Contents" unless
 * `aria-label` says otherwise, with no visible heading) holding nested lists of links to the page's sections (`href="#{id}"`). Scroll-spy marks
 * the section in view with `aria-current="location"`, the active colour and an indicator
 * bar over the rail. A click scrolls smoothly to the section (instantly under
 * `prefers-reduced-motion`) and holds the highlight on it until the scroll ends. Targets
 * set their own `scroll-margin-top` to clear a sticky header.
 *
 * @example
 * ```tsx
 * <Contents
 *   items={[
 *     { id: "docs", label: "Docs" },
 *     { id: "props", label: "Props", items: [{ id: "size", label: "size" }] },
 *   ]}
 * />
 * ```
 */
const Contents: React.FC<ContentsProps> = ({
  items,
  activeId: activeIdProp,
  onActiveChange,
  "aria-label": ariaLabel = "Contents",
  size = "smaller",
}) => {
  const ids = React.useMemo(() => getContentsIds(items), [items])
  const [spiedId, setSpiedId] = React.useState<string | undefined>(ids[0])
  const heldId = React.useRef<string | null>(null)
  const onActiveChangeRef = React.useRef(onActiveChange)
  onActiveChangeRef.current = onActiveChange
  const activeId = activeIdProp ?? spiedId
  const navRef = React.useRef<HTMLElement>(null)

  // Keep the active row inside the nav when the rows overflow it; only the nav scrolls.
  React.useEffect(() => {
    const nav = navRef.current
    const link = nav?.querySelector<HTMLElement>('[aria-current="location"]')
    if (!nav || !link) return
    const top = link.offsetTop
    const bottom = link.offsetTop + link.offsetHeight - nav.clientHeight
    if (nav.scrollTop > top) nav.scrollTop = top
    else if (nav.scrollTop < bottom) nav.scrollTop = bottom
  }, [activeId])

  const activate = React.useCallback((id: string | undefined) => {
    if (id === undefined) return
    setSpiedId(current => {
      if (current !== id) onActiveChangeRef.current?.(id)
      return id
    })
  }, [])

  React.useEffect(() => {
    let frame = 0
    const spy = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (heldId.current === null) activate(getSpiedId(ids))
      })
    }
    const release = () => {
      if (heldId.current === null) return
      heldId.current = null
      spy()
    }
    spy()
    document.addEventListener("scroll", spy, { capture: true, passive: true })
    document.addEventListener("scrollend", release, { capture: true })
    window.addEventListener("resize", spy)
    USER_SCROLL_EVENTS.forEach(type => window.addEventListener(type, release, { passive: true }))
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener("scroll", spy, { capture: true })
      document.removeEventListener("scrollend", release, { capture: true })
      window.removeEventListener("resize", spy)
      USER_SCROLL_EVENTS.forEach(type => window.removeEventListener(type, release))
    }
  }, [ids, activate])

  const select = (id: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(id)
    if (!target) return
    event.preventDefault()
    heldId.current = id
    activate(id)
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" })
  }

  const renderList = (level: ContentsItemsType, depth: number) => (
    <StyledContentsList>
      {level.map(item => {
        const active = item.id === activeId
        return (
          <StyledContentsItem key={item.id}>
            <StyledContentsLink
              href={`#${item.id}`}
              aria-current={active ? "location" : undefined}
              onClick={(event: React.MouseEvent<HTMLAnchorElement>) => select(item.id, event)}
              $depth={depth}
              $active={active}
            >
              <Ink size={size}>{item.label}</Ink>
            </StyledContentsLink>
            {item.items && item.items.length > 0 ? renderList(item.items, depth + 1) : null}
          </StyledContentsItem>
        )
      })}
    </StyledContentsList>
  )

  return (
    <StyledContents
      ref={navRef}
      aria-label={ariaLabel}
    >
      {renderList(items, 0)}
    </StyledContents>
  )
}

export default Contents
