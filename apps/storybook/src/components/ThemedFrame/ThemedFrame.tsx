import * as React from "react"
import Icon from "@niceprototypes/icon"
import Ink from "../../nice/Ink"
import {
  FrameDiv,
  FrameIframe,
  FrameScrollDiv,
  LockClosedIcon,
  LockOpenIcon,
  ThemedFrameFlex,
  ThemedFrameToggle,
} from "./ThemedFrame.styles"
import type { ThemedFrameProps } from "./ThemedFrame.types"
import Flex from "@niceprototypes/flex"

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
 * The frame starts behind a full-bleed overlay and its container clips overflow,
 * so scrolling the page past a demo does not get captured by the frame. Clicking
 * the overlay dismisses it and switches the container to `overflow: auto`;
 * a button in the corner puts it back.
 *
 * The lock is a button rather than a second click on the frame because a click
 * inside an iframe belongs to that document and never reaches this one — there
 * is no event here to hang it on.
 */
const ThemedFrame: React.FC<ThemedFrameProps> = ({ toggleLabel = "Click to scroll", ...props }) => {
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
        <FrameIframe ref={ref} {...props} onLoad={applyTheme} />
      </FrameScrollDiv>
      {scrollable ? (
        <ThemedFrameFlex
          role="button"
          tabIndex={0}
          aria-label="Lock frame"
          onClick={() => setScrollable(false)}
          onKeyDown={event => {
            if (event.key === "Enter" || event.key === " ") setScrollable(false)
          }}
        >
          <Icon name="lock-down" size="small" />
        </ThemedFrameFlex>
      ) : (
        <ThemedFrameToggle onClick={() => setScrollable(true)}>
          <Flex gap="base" alignItems="center">
            <LockClosedIcon name="lock-down" size="larger" strokeWidth="large" color={{ name: "base", inverse: true }} />
            <LockOpenIcon name="lock-up" size="larger" strokeWidth="large" color={{ name: "base", inverse: true }} />
            <Ink size="large" color={{ name: "base", inverse: true }}>
              {toggleLabel}
            </Ink>
          </Flex>
        </ThemedFrameToggle>
      )}
    </FrameDiv>
  )
}

export default ThemedFrame
