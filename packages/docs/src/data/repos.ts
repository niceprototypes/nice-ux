import type { Repo } from "../components/RepoLink"

/** The package.json fields a repo link reads; a private package has no repository or license. */
type ManifestType = {
  name: string
  license?: string
  repository?: { url: string; directory: string }
  peerDependencies?: Record<string, string>
}

/** Every workspace package's package.json, by package name. */
const manifests = new Map(
  Object.values(import.meta.glob<ManifestType>("../../../*/package.json", { eager: true, import: "default" })).map(
    manifest => [manifest.name, manifest],
  ),
)

/** A published package's repo link (its folder in the monorepo's GitHub tree, and its license), else undefined. */
const repoOf = (packageName: string): Repo | undefined => {
  const manifest = manifests.get(packageName)
  if (!manifest?.repository || !manifest.license) return undefined
  const { url, directory } = manifest.repository
  return {
    name: manifest.name,
    url: `${url.replace(/^git\+/, "").replace(/\.git$/, "")}/tree/main/${directory}`,
    license: manifest.license,
  }
}

/**
 * A package's repo links, from its package.json: its own repo, then each `-vendor` package it
 * takes as a peer (the install a consumer adds alongside it), marked `peer`.
 */
export const reposOf = (packageName: string): Repo[] => {
  const own = repoOf(packageName)
  if (!own) return []
  const vendors = Object.keys(manifests.get(packageName)?.peerDependencies ?? {})
    .filter(name => name.endsWith("-vendor"))
    .flatMap(name => {
      const vendor = repoOf(name)
      return vendor ? [{ ...vendor, status: "peer" as const }] : []
    })
  return [own, ...vendors]
}
