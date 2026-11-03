import * as React from "react"
import Button from "@niceprototypes/button"
import Flex from "@niceprototypes/flex"
import Ink from "@niceprototypes/ink"
import Input from "@niceprototypes/input"
import Listbox, { getListboxOptionId } from "@niceprototypes/listbox"
import Popover from "@niceprototypes/popover"
import type { AppEntryType } from "./App.types"
import type { TreeSizeType } from "@niceprototypes/tree"
import { StyledAppSearch } from "./App.styles"

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
 * AppSearch
 *
 * The sidebar search, at the end of the header row: a search button that, clicked (or Enter, Space),
 * expands into a combobox field over the index's page names and the story, chapter or folder names
 * above them, focused. Typing lists matches under it; the arrow keys move through them while focus
 * stays in the field, Enter or a click opens one (`onGo`). Escape closes the list, or with none open
 * collapses the field back to the button and focuses it; so does leaving it empty.
 */
const AppSearch: React.FC<{
  entries: AppEntryType[]
  onGo: (entry: AppEntryType) => void
  "aria-label": string
  /** The nav labels' size, which the field's text matches */
  size: TreeSizeType
}> = ({ entries, onGo, "aria-label": ariaLabel, size }) => {
  const [query, setQuery] = React.useState("")
  const [active, setActive] = React.useState<string>()
  const [expanded, setExpanded] = React.useState(false)
  // Whether the field is out (else the search button)
  const [open, setOpen] = React.useState(false)
  const button = React.useRef<HTMLButtonElement>(null)
  const refocus = React.useRef(false)
  const anchor = React.useRef<HTMLDivElement>(null)
  const listboxId = React.useId()
  const results = React.useMemo(() => search(entries, query), [entries, query])
  const shown = expanded && results.length > 0
  const activeIndex = results.findIndex(entry => entry.id === active)

  const go = (id: string) => {
    const entry = results.find(result => result.id === id)
    if (!entry) return
    onGo(entry)
    setQuery("")
    setExpanded(false)
    setOpen(false)
  }

  // Collapsing with Escape returns focus to the button that replaces the field.
  React.useEffect(() => {
    if (!open && refocus.current) {
      refocus.current = false
      button.current?.focus()
    }
  }, [open])

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      // Escape here is the field's own: the open drawer stays open.
      event.stopPropagation()
      if (shown) return setExpanded(false)
      setQuery("")
      refocus.current = true
      return setOpen(false)
    }
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
    <StyledAppSearch ref={anchor} $size={size} $expanded={open}>
      {!open ? (
        <Button ref={button} size="small" iconLeft="search" aria-label={ariaLabel} onClick={() => setOpen(true)} />
      ) : (
        <Input
          type="search"
          role="combobox"
          aria-label={ariaLabel}
          aria-autocomplete="list"
          aria-expanded={shown}
          aria-controls={listboxId}
          aria-activedescendant={shown && activeIndex >= 0 ? getListboxOptionId(listboxId, activeIndex) : undefined}
          placeholder="Search"
          size="small"
          backgroundColor="raised"
          autoFocus
          value={query}
          onChange={value => {
            setQuery(value)
            setExpanded(true)
            setActive(search(entries, value)[0]?.id)
          }}
          onKeyDown={onKeyDown}
          onBlur={() => {
            if (!query) setOpen(false)
          }}
        />
      )}
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
    </StyledAppSearch>
  )
}

export default AppSearch
