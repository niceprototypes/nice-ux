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
  /** GitHub repos for the package(s) this page documents. */
  repos?: Repo[]
  /** Optional content rendered between the description and the horizontal rule. */
  children?: React.ReactNode
}