import * as React from "react"
import DocsPage, { type DocsPageSectionType } from "../DocsPage"
import { getItem, getTokenTable, ModuleTokenTable, StoryHeader, type DataItem, type ModuleTokenTableSectionConfig, type TokenTable } from "../../storybook"

/** A Tokens entry's tables: a folder's groups as one cluster, or a page's one group; none for a hand-written page (`table: false`). */
const toConfig = (item: DataItem): ModuleTokenTableSectionConfig | undefined => {
  if (!item.isFolder) {
    const group = getTokenTable(item.id)
    return group && { group }
  }
  const groups = item.children.map(child => getTokenTable(child.id)).filter((table): table is TokenTable => !!table)
  return groups.length ? { name: item.name, groups } : undefined
}

/** One section per Tokens entry in storybook.json that has tables, in sidebar order. */
const tokenSections = (): DocsPageSectionType[] => {
  const tokens = getItem("tokens")
  const sectionWrapped = tokens?.settings.sectionWrapped === true
  return (tokens?.children ?? []).flatMap(item => {
    const config = toConfig(item)
    return config ? [{ id: item.id, label: item.name, content: <ModuleTokenTable sections={[config]} sectionWrapped={sectionWrapped} /> }] : []
  })
}

/**
 * TokensPage
 *
 * Every core token, one table per group (colour groups with their light and dark values), with
 * Contents listing the groups.
 */
const TokensPage: React.FC = () => {
  const sections = React.useMemo(tokenSections, [])
  return (
    <DocsPage
      wrapped={getItem("tokens")?.settings.wrapped === true}
      sections={[{ id: "tokens", label: "Tokens", content: <StoryHeader title="Tokens" /> }, ...sections]}
    />
  )
}

export default TokensPage
