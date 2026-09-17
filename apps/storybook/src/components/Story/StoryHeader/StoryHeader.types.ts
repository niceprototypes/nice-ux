import * as React from "react"
import type { Repo } from "../../RepoLink"

// `Repo` / `RepoStatus` live with the RepoLink component now; re-exported here so
// existing `Story` / `StoryHeader` type imports keep resolving.
export type { Repo, RepoStatus } from "../../RepoLink"

export interface StoryHeaderProps {
  /** The page title text rendered as the `<h1>`. */
  title: React.ReactNode
  /** Optional lead paragraph rendered under the title, above the rule. */
  description?: React.ReactNode
  /**
   * First section heading of the page, rendered as the `<h2>` below the header.
   * Use instead of opening the page body with a `##` line, so the header owns
   * the whole block. Markdown does not apply inside a prop — pass JSX for
   * emphasis (`<code>`, `<strong>`).
   */
  heading?: React.ReactNode
  /** Paragraph under `heading`. Ignored when `heading` is absent. */
  headingDescription?: React.ReactNode
  /** GitHub repos for the package(s) this page documents. */
  repos?: Repo[]
  /** Optional content rendered between the description and the horizontal rule. */
  children?: React.ReactNode
}