/**
 * A dependency relationship, shown as the repo's status label. `undefined` marks
 * the package's own repo; the named kinds mark a related repo pulled in as that
 * kind of dependency (e.g. a `--vendor` package linked as a `peer`).
 */
export type RepoStatus = "peer" | "dev" | "optional"

/** One GitHub repo shown as a {@link RepoLink}. */
export interface Repo {
  /** Package / repo name, e.g. `"@niceprototypes/button"`. */
  name: string
  /** Full GitHub repo URL. */
  url: string
  /** SPDX license identifier, e.g. `"MIT"`. */
  license: string
  /**
   * Dependency relationship to the story's package. `undefined` for the
   * package's own repo; set to the dependency kind for a related repo.
   */
  status?: RepoStatus
}

/** Props for {@link RepoLink}. */
export interface RepoLinkProps {
  /** The repo to render as a link. */
  repo: Repo
}
