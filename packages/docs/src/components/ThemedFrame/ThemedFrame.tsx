import * as React from "react"
import Button from "@niceprototypes/button"
import {
  FrameDiv,
  FrameIframe,
  FrameScrollDiv,
  ThemedFrameControl,
} from "./ThemedFrame.styles"
import type { ThemedFrameProps } from "./ThemedFrame.types"

/**
 * An `<iframe srcDoc>` whose own `<html>` mirrors the parent document's
 * `data-theme`. A srcDoc iframe is a separate document, so it never inherits the
 * `data-theme` the Storybook toggle sets on the parent root — inside it only
 * tokens.css's `@media (prefers-color-scheme)` fires, so it tracks the OS, not
 * the toggle. Copying the parent attribute in lets tokens.css's `[data-theme]`
 * rules win over the media query, so the frame follows the toggle. The reset's
 * `color-scheme: light dark` still hands native controls + scrollbars to the OS,
 * so it's pinned to a single scheme inline (inline beats the `:root` rule) to
 * match. Re-applied on mount, on toggle (a `data-theme` MutationObserver), and
 * on every (re)load.
 *
 * The frame starts locked: the iframe takes no pointer input and its container
 * clips overflow, so wheel and touch over a demo scroll the page, not the frame.
 * One button in the bottom-right corner toggles the lock: a closed padlock while
 * locked, an open one while scrolling, `aria-pressed` while unlocked.
 *
 * The lock is a button rather than a click on the frame because a click inside an
 * iframe belongs to that document and never reaches this one — there is no event
 * here to hang it on.
 */
const ThemedFrame: React.FC<ThemedFrameProps> = props => {
  const ref = React.useRef<HTMLIFrameElement>(null)
  const [scrollable, setScrollable] = React.useState(false)

  const applyTheme = React.useCallback(() => {
    const root = ref.current?.contentDocument?.documentElement
    if (!root) return
    const theme = document.documentElement.getAttribute("data-theme")
    if (theme) {
      root.setAttribute("data-theme", theme)
      root.style.colorScheme = theme === "night" ? "dark" : "light"
    } else {
      root.removeAttribute("data-theme")
      root.style.removeProperty("color-scheme")
    }
  }, [])

  React.useEffect(() => {
    applyTheme()
    const observer = new MutationObserver(applyTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    })
    return () => observer.disconnect()
  }, [applyTheme])

  return (
    <FrameDiv $scrollable={scrollable}>
      <FrameScrollDiv $scrollable={scrollable}>
        <FrameIframe ref={ref} {...props} $locked={!scrollable} onLoad={applyTheme} />
      </FrameScrollDiv>
      <ThemedFrameControl>
        <Button
          filled
          iconLeft={scrollable ? "lock-up" : "lock-down"}
          aria-label="Scroll the demo"
          aria-pressed={scrollable}
          onClick={() => setScrollable(current => !current)}
        />
      </ThemedFrameControl>
    </FrameDiv>
  )
}

export default ThemedFrame
