import * as React from "react"
import { useEffect, useState } from "react"
import { addons } from "storybook/preview-api"
import {
  DARK_MODE_EVENT_NAME,
  UPDATE_DARK_MODE_EVENT_NAME,
} from "storybook-dark-mode"
import { navigate } from "@storybook/addon-links"
import { OuterFlex, SpacerDiv } from "./StoryNavigation.styles"
import { sequences, type StoryNavigationItem } from "./StoryNavigation.order"
import {
  TOGGLE_NAV_EVENT,
  NAV_STATE_EVENT,
  REQUEST_NAV_STATE_EVENT,
  OPEN_IN_EDITOR_EVENT,
} from "./StoryNavigation.events"
import StoryNavigationLink from "./StoryNavigationLink"
import StoryNavigationSettings from "./StoryNavigationSettings"
import Flex from "nice-react-flex"
import type { ThemeType } from "nice-styles"
import Ink from "../../../nice/Ink"

interface StoryNavigationProps {
  /** Override the current story id; defaults to the `id` URL query param. */
  currentId?: string
  /**
   * Label of the current story, shown between the back and next links. Defaults
   * to the current page's `label` in `StoryNavigation.order.ts`, so it matches
   * the wording of the back/next links.
   */
  name?: string
  /**
   * Active theme, driving the theme toggle's icon and label. Defaults to the
   * theme reported by storybook-dark-mode over the addons channel.
   */
  theme?: ThemeType
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

/**
 * Find `id`'s own entry and its back/next neighbours within whichever sequence
 * contains it.
 */
function neighbours(id: string): {
  back?: StoryNavigationItem
  current?: StoryNavigationItem
  next?: StoryNavigationItem
} {
  for (const seq of sequences) {
    const i = seq.findIndex(item => item.id === id)
    if (i !== -1) return { back: seq[i - 1], current: seq[i], next: seq[i + 1] }
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
const StoryNavigation: React.FC<StoryNavigationProps> = ({
  currentId,
  name,
  theme,
}) => {
  console.log(theme)
  // storybook-dark-mode only knows light/dark; the `data-theme` attribute
  // mirrored onto <html> in preview.tsx is the day/night equivalent.
  const [detectedTheme, setDetectedTheme] = useState<ThemeType>(() =>
    typeof document !== "undefined" &&
    document.documentElement.getAttribute("data-theme") === "night"
      ? "night"
      : "day"
  )
  // Reflects Storybook's sidebar (nav) visibility, kept in sync by the manager
  // over the channel. Nav is shown by default; the request-on-mount corrects it.
  const [isNavShown, setIsNavShown] = useState(true)

  useEffect(() => {
    const channel = addons.getChannel()
    const onDarkMode = (isDark: boolean) =>
      setDetectedTheme(isDark ? "night" : "day")
    channel.on(DARK_MODE_EVENT_NAME, onDarkMode)
    channel.on(NAV_STATE_EVENT, setIsNavShown)
    channel.emit(REQUEST_NAV_STATE_EVENT)
    return () => {
      channel.off(DARK_MODE_EVENT_NAME, onDarkMode)
      channel.off(NAV_STATE_EVENT, setIsNavShown)
    }
  }, [])

  const id = resolveCurrentId(currentId)
  const { back, current, next } = id ? neighbours(id) : {}
  const currentName = name ?? current?.label
  const activeTheme = theme ?? detectedTheme
  const otherTheme: ThemeType = activeTheme === "night" ? "day" : "night"

  return (
    <>
      <OuterFlex>
        <Flex gap="large">
          {back && (
            <StoryNavigationLink
              label={back?.label}
              onClick={() => navigate({ storyId: back.id })}
              iconLeft="arrow-left"
            />
          )}
          {currentName && (
            <Ink size="small" weight="medium" color="lightest">
              {currentName}
            </Ink>
          )}
          {next && (
            <StoryNavigationLink
              label={next?.label}
              onClick={() => navigate({ storyId: next.id })}
              iconRight="arrow-right"
            />
          )}
        </Flex>
        <Flex gap="large">
          <StoryNavigationLink
            label={isNavShown ? "Collapse menu" : "Expand menu"}
            onClick={() => addons.getChannel().emit(TOGGLE_NAV_EVENT)}
            iconLeft={isNavShown ? "collapse" : "expand"}
          />
          <StoryNavigationLink
            label="Open in editor"
            onClick={() => addons.getChannel().emit(OPEN_IN_EDITOR_EVENT)}
            iconLeft="code"
          />
          <StoryNavigationLink
            label={`Switch to ${otherTheme} mode`}
            onClick={() => addons.getChannel().emit(UPDATE_DARK_MODE_EVENT_NAME)}
            iconLeft={otherTheme === "day" ? "sun" : "moon"}
            iconVendor
          />
          <StoryNavigationSettings />
        </Flex>
      </OuterFlex>
      <SpacerDiv />
    </>
  )
}

export default StoryNavigation
