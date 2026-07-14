import * as React from "react"

/**
 * A dependency relationship, shown as the repo's status label. `undefined` marks
 * the package's own repo; the named kinds mark a related repo pulled in as that
 * kind of dependency (e.g. a `--vendor` package linked as a `peer`).
 */
export type RepoStatus = "peer" | "dev" | "optional"

/** One GitHub repo shown in the story header. */
export interface Repo {
  /** Package / repo name, e.g. `"nice-react-button"`. */
  name: string
  /** Full GitHub repo URL. */
  url: string
  /** SPDX license identifier, e.g. `"MIT"`. */
  license: string
  /**
   * Dependency relationship to the story's package. `undefined` for the
   * package's own repo; set to the dependency kind for a related repo (the
   * `--vendor` packages behind `react-icon` / `react-image` are `peer`).
   */
  status?: RepoStatus
}

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