/** The share of the viewport height, from its top, a section's top must pass to become active. */
const SPY_LINE = 0.25

/**
 * The id of the section in view: the last one, in page order, whose top has passed the spy
 * line. Once the page is scrolled to its end, the last section whose top is on screen wins,
 * so short closing sections still activate. Before the first section passes, the first.
 */
export const getSpiedId = (ids: readonly string[]): string | undefined => {
  const sections = ids
    .map(id => ({ id, element: document.getElementById(id) }))
    .filter((section): section is { id: string; element: HTMLElement } => section.element !== null)
  if (sections.length === 0) return undefined

  const viewport = window.innerHeight
  const page = document.scrollingElement ?? document.documentElement
  const atEnd = page.scrollTop > 0 && page.scrollTop + viewport >= page.scrollHeight - 1
  const line = atEnd ? viewport : viewport * SPY_LINE

  let active = sections[0].id
  for (const { id, element } of sections) {
    if (element.getBoundingClientRect().top <= line) active = id
  }
  return active
}
