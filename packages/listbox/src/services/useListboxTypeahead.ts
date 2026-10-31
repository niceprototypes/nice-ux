import * as React from "react"

/** Typeahead buffer lifetime after the last printable key, in ms. */
const TYPEAHEAD_TIMEOUT = 500

/**
 * Typeahead buffer for a listbox. `type(key)` appends a printable key and
 * returns the lowercased search so far; the buffer clears
 * `TYPEAHEAD_TIMEOUT` ms after the last key. `isTyping()` is true while a
 * search is running, so a Space can join it ("new york") instead of selecting.
 */
export function useListboxTypeahead(): { type: (key: string) => string; isTyping: () => boolean } {
  const search = React.useRef("")
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  React.useEffect(() => () => clearTimeout(timer.current), [])

  return React.useMemo(
    () => ({
      type: (key: string) => {
        clearTimeout(timer.current)
        search.current += key.toLowerCase()
        timer.current = setTimeout(() => {
          search.current = ""
        }, TYPEAHEAD_TIMEOUT)
        return search.current
      },
      isTyping: () => search.current !== "",
    }),
    []
  )
}
