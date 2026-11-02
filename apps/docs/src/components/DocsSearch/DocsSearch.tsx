import * as React from "react"
import { useScenes, type AppEntryType } from "@niceprototypes/app"
import Flex from "@niceprototypes/flex"
import Ink from "@niceprototypes/ink"
import Input from "@niceprototypes/input"
import Listbox, { getListboxOptionId } from "@niceprototypes/listbox"
import Popover from "@niceprototypes/popover"
import { StyledDocsSearch } from "./DocsSearch.styles"

/** The most results the list shows. */
const LIMIT = 10

/** Pages whose name or section path holds the query, names that start with it first, then names that hold it, then sections. */
const search = (entries: AppEntryType[], query: string): AppEntryType[] => {
  const needle = query.trim().toLowerCase()
  if (!needle) return []
  const rank = (entry: AppEntryType) => {
    const name = entry.names[entry.names.length - 1].toLowerCase()
    if (name.startsWith(needle)) return 0
    if (name.includes(needle)) return 1
    return entry.names.join(" ").toLowerCase().includes(needle) ? 2 : -1
  }
  return entries
    .map(entry => ({ entry, rank: rank(entry) }))
    .filter(({ rank }) => rank >= 0)
    .sort((a, b) => a.rank - b.rank)
    .slice(0, LIMIT)
    .map(({ entry }) => entry)
}

/**
 * DocsSearch
 *
 * The site search: a combobox field over the pages' names and sections. Typing lists matches
 * under it; the arrow keys move through them while focus stays in the field, Enter or a click
 * opens one on the router, Escape closes the list.
 */
const DocsSearch: React.FC = () => {
  const { entries, open } = useScenes()
  const [query, setQuery] = React.useState("")
  const [active, setActive] = React.useState<string>()
  const [expanded, setExpanded] = React.useState(false)
  const anchor = React.useRef<HTMLDivElement>(null)
  const listboxId = React.useId()
  const results = React.useMemo(() => search(entries, query), [entries, query])
  const shown = expanded && results.length > 0
  const activeIndex = results.findIndex(entry => entry.id === active)

  const go = (id: string) => {
    const entry = results.find(result => result.id === id)
    if (!entry) return
    open(entry)
    setQuery("")
    setExpanded(false)
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") return setExpanded(false)
    if (!results.length) return
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault()
      setExpanded(true)
      const step = event.key === "ArrowDown" ? 1 : -1
      setActive(results[(activeIndex + step + results.length) % results.length].id)
    } else if (event.key === "Enter" && active) {
      event.preventDefault()
      go(active)
    }
  }

  return (
    <StyledDocsSearch ref={anchor}>
      <Input
        type="search"
        role="combobox"
        aria-label="Search docs"
        aria-autocomplete="list"
        aria-expanded={shown}
        aria-controls={listboxId}
        aria-activedescendant={shown && activeIndex >= 0 ? getListboxOptionId(listboxId, activeIndex) : undefined}
        placeholder="Search"
        size="small"
        value={query}
        onChange={value => {
          setQuery(value)
          setExpanded(true)
          setActive(search(entries, value)[0]?.id)
        }}
        onKeyDown={onKeyDown}
      />
      <Popover open={shown} onOpenChange={setExpanded} anchorRef={anchor} matchAnchorWidth position="bottom" align="start">
        <Listbox
          id={listboxId}
          aria-label="Results"
          focusable={false}
          size="small"
          activeValue={active}
          onActiveChange={value => setActive(value ?? undefined)}
          onChange={go}
          options={results.map(entry => ({
            value: entry.id,
            label: (
              <Flex direction="column">
                <Ink>{entry.names[entry.names.length - 1]}</Ink>
                {entry.names.length > 1 && <Ink size="small" color="lighter">{entry.names.slice(0, -1).join(" / ")}</Ink>}
              </Flex>
            ),
          }))}
        />
      </Popover>
    </StyledDocsSearch>
  )
}

export default DocsSearch
