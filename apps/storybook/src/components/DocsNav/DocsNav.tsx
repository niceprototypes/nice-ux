import * as React from "react"
import { navigate } from "@storybook/addon-links"
import Button from "nice-react-button"
import { NavFooter } from "./DocsNav.styles"
import { sequences, type DocsNavItem } from "./DocsNav.order"

interface DocsNavProps {
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
function neighbours(id: string): { back?: DocsNavItem; next?: DocsNavItem } {
  for (const seq of sequences) {
    const i = seq.findIndex(item => item.id === id)
    if (i !== -1) return { back: seq[i - 1], next: seq[i + 1] }
  }
  return {}
}

/**
 * Story footer navigation — a back button to the previous page and a next
 * button to the following one, drawn from a central ordered sequence
 * (`DocsNav.order.ts`). Renders nothing when the current page isn't part of a
 * sequence, so it's safe to drop at the foot of every story.
 */
const DocsNav: React.FC<DocsNavProps> = ({ currentId }) => {
  const id = resolveCurrentId(currentId)
  if (!id) return null

  const { back, next } = neighbours(id)
  if (!back && !next) return null

  return (
    <NavFooter>
      {/* Empty span keeps the next button right-aligned on the first page */}
      {back ? (
        <Button status="secondary" onClick={() => navigate({ storyId: back.id })}>
          Go back to {back.label}
        </Button>
      ) : (
        <span />
      )}
      {next ? (
        <Button status="primary" onClick={() => navigate({ storyId: next.id })}>
          Continue to {next.label}
        </Button>
      ) : (
        <span />
      )}
    </NavFooter>
  )
}

export default DocsNav
