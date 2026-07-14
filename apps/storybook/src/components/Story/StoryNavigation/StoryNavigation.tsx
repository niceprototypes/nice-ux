import * as React from "react"
import { useEffect, useState } from "react"
import { addons } from "storybook/preview-api"
import {
  DARK_MODE_EVENT_NAME,
  UPDATE_DARK_MODE_EVENT_NAME,
} from "storybook-dark-mode"
import { navigate } from "@storybook/addon-links"
import { NavigationSubFlex, NavigationFlex } from "./StoryNavigation.styles"
import { sequences, type StoryNavigationItem } from "./StoryNavigation.order"
import {
  TOGGLE_NAV_EVENT,
  NAV_STATE_EVENT,
  REQUEST_NAV_STATE_EVENT,
  OPEN_IN_EDITOR_EVENT,
} from "./StoryNavigation.events"
import Button from "nice-react-button"
import Flex from "nice-react-flex"

interface StoryNavigationProps {
  /** Override the current story id; defaults to the `id` URL query param. */
  currentId?: string
}

/**
 * Resolve the current docs id. In a Storybook docs page the preview iframe URL
 * carries `?id=<docsId>&viewMode=docs`, so reading the `id` param identifies the
 * page. An explicit `currentId` prop overrides it.
 */
function resolveCurrentId(currentId?: string): string | null {
  if (currentId) return currentId
  if (typeof window === "undefined") return null
  return new URLSearchParams(window.location.search).get("id")
}

/** Find the back/next neighbours of `id` within whichever sequence contains it. */
function neighbours(id: string): {
  back?: StoryNavigationItem
  next?: StoryNavigationItem
} {
  for (const seq of sequences) {
    const i = seq.findIndex(item => item.id === id)
    if (i !== -1) return { back: seq[i - 1], next: seq[i + 1] }
  }
  return {}
}

/**
 * Fixed bottom-right control bar of storybook actions: a sidebar (nav) toggle
 * that expands/collapses Storybook's menu via the manager (see
 * `StoryNavigation.events.ts`), the dark-mode toggle, and back/next story navigation
 * (shown only when the current page belongs to a navigable sequence in
 * `StoryNavigation.order.ts`). Rendered globally from preview.tsx, so it's on every
 * docs page.
 */
const StoryNavigation: React.FC<StoryNavigationProps> = ({ currentId }) => {
  const [isDark, setIsDark] = useState(
    typeof document !== "undefined" &&
      document.documentElement.getAttribute("data-theme") === "night"
  )
  // Reflects Storybook's sidebar (nav) visibility, kept in sync by the manager
  // over the channel. Nav is shown by default; the request-on-mount corrects it.
  const [isNavShown, setIsNavShown] = useState(true)

  useEffect(() => {
    const channel = addons.getChannel()
    channel.on(DARK_MODE_EVENT_NAME, setIsDark)
    channel.on(NAV_STATE_EVENT, setIsNavShown)
    channel.emit(REQUEST_NAV_STATE_EVENT)
    return () => {
      channel.off(DARK_MODE_EVENT_NAME, setIsDark)
      channel.off(NAV_STATE_EVENT, setIsNavShown)
    }
  }, [])

  const id = resolveCurrentId(currentId)
  const { back, next } = id ? neighbours(id) : {}

  const backLabel = `Return to ${back?.label}`
  const nextLabel = `Continue to ${next?.label}`
  const themeLabel = `Switch to ${isDark ? "day" : "night"} mode`
  const navLabel = isNavShown ? "Collapse menu" : "Expand menu"

  return (
    <NavigationFlex>
      <NavigationSubFlex>
        <Button
          as="a"
          aria-label={navLabel}
          onClick={() => addons.getChannel().emit(TOGGLE_NAV_EVENT)}
          iconLeft={isNavShown ? "collapse" : "expand"}
        >
          {navLabel}
        </Button>
        <Button
          as="a"
          aria-label="Open in editor"
          onClick={() => addons.getChannel().emit(OPEN_IN_EDITOR_EVENT)}
          iconLeft="code"
        >
          Open in editor
        </Button>
      </NavigationSubFlex>
      <NavigationSubFlex>
        {back && (
          <Flex
          >
            <Button
              as="a"
              aria-label={backLabel}
              onClick={() => navigate({ storyId: back.id })}
              iconLeft="arrow-left"
            >
              {backLabel}
            </Button>
          </Flex>
        )}
        {next && (
          <Flex
          >
            <Button
              as="a"
              aria-label={nextLabel}
              onClick={() => navigate({ storyId: next.id })}
              iconRight="arrow-right"
            >
              {nextLabel}
            </Button>
          </Flex>
        )}
      </NavigationSubFlex>
      <NavigationSubFlex>
        <Button
          size="smaller"
          as="a"
          aria-label={themeLabel}
          onClick={() => addons.getChannel().emit(UPDATE_DARK_MODE_EVENT_NAME)}
          iconLeft={isDark ? "sun" : "moon"}
          iconVendor
        >
          {themeLabel}
        </Button>
      </NavigationSubFlex>
    </NavigationFlex>
  )
}

export default StoryNavigation
