import * as React from "react"
import { useEffect, useState } from "react"
import { addons } from "storybook/preview-api"
import {
  DARK_MODE_EVENT_NAME,
  UPDATE_DARK_MODE_EVENT_NAME,
} from "storybook-dark-mode"
import { navigate } from "@storybook/addon-links"
import { FooterFlex } from "./StoryFooter.styles"
import { sequences, type StoryFooterItem } from "./StoryFooter.order"
import Button from "nice-react-button"

interface StoryFooterProps {
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
function neighbours(id: string): { back?: StoryFooterItem; next?: StoryFooterItem } {
  for (const seq of sequences) {
    const i = seq.findIndex(item => item.id === id)
    if (i !== -1) return { back: seq[i - 1], next: seq[i + 1] }
  }
  return {}
}

/**
 * Fixed bottom-right control bar — the dark-mode toggle (always shown) plus
 * back/next story navigation, shown only when the current page belongs to a
 * navigable sequence (`StoryFooter.order.ts`). Rendered globally from
 * preview.tsx so the toggle is on every docs page.
 */
const StoryFooter: React.FC<StoryFooterProps> = ({ currentId }) => {
  const [isDark, setIsDark] = useState(
    typeof document !== "undefined" &&
      document.documentElement.getAttribute("data-theme") === "night"
  )

  useEffect(() => {
    const channel = addons.getChannel()
    channel.on(DARK_MODE_EVENT_NAME, setIsDark)
    return () => channel.off(DARK_MODE_EVENT_NAME, setIsDark)
  }, [])

  const id = resolveCurrentId(currentId)
  const { back, next } = id ? neighbours(id) : {}

  return (
    <FooterFlex>
      {back && (
        <Button
          aria-label={`Go back to ${back.label}`}
          onClick={() => navigate({ storyId: back.id })}
          icon="arrow-left"
        />
      )}
      {next && (
        <Button
          aria-label={`Continue to ${next.label}`}
          onClick={() => navigate({ storyId: next.id })}
          icon="arrow-right"
        />
      )}
      <Button
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        onClick={() => addons.getChannel().emit(UPDATE_DARK_MODE_EVENT_NAME)}
        icon={isDark ? "Sun" : "Moon"}
        iconVendor
      />
    </FooterFlex>
  )
}

export default StoryFooter
