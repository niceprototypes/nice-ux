import type { HeadResources, LinkAttributes, MetaAttributes, ScriptAttributes } from "../types"

/** Marks elements this package created, so injection can be idempotent and reversible. */
const OWNED_ATTRIBUTE = "data-nice-head"

/**
 * A stable identity for a resource, used to avoid injecting the same thing
 * twice across re-renders, route changes, and repeat `injectHead` calls.
 */
function resourceKey(kind: string, attributes: Record<string, unknown>): string {
  const id = attributes.id ?? attributes.src ?? attributes.href ?? attributes.name ?? attributes.property
  return `${kind}:${String(id ?? JSON.stringify(attributes))}`
}

function findOwned(key: string): Element | null {
  return document.head.querySelector(`[${OWNED_ATTRIBUTE}="${CSS.escape(key)}"]`)
}

function applyAttributes(element: Element, attributes: Record<string, unknown>): void {
  for (const [name, value] of Object.entries(attributes)) {
    if (value === undefined || value === null || value === false) continue
    // React prop casing → DOM attribute names.
    const attribute = name
      .replace(/^httpEquiv$/, "http-equiv")
      .replace(/^charSet$/, "charset")
      .replace(/^crossOrigin$/, "crossorigin")
      .replace(/^hrefLang$/, "hreflang")
    element.setAttribute(attribute, value === true ? "" : String(value))
  }
}

/**
 * Write head resources into `document.head`.
 *
 * SSR-safe (no-ops without a DOM) and idempotent — every element is tagged with
 * `data-nice-head` keyed by identity, and an existing match is updated rather
 * than duplicated. The same contract `injectFontLinks` provides in
 * `nice-styles`.
 *
 * Inline scripts are the reason this exists at all. React 19 hoists external
 * async scripts but gives inline ones no treatment, so anything with a body has
 * to be written here.
 *
 * @returns A cleanup function removing everything this call created.
 */
export function injectHeadResources(resources: HeadResources): () => void {
  if (typeof document === "undefined") return () => {}

  const created: Element[] = []

  const upsert = (tag: string, attributes: Record<string, unknown>, textContent?: string) => {
    const key = resourceKey(tag, attributes)
    const existing = findOwned(key)
    if (existing) {
      applyAttributes(existing, attributes)
      if (textContent !== undefined) existing.textContent = textContent
      return
    }
    const element = document.createElement(tag)
    applyAttributes(element, attributes)
    element.setAttribute(OWNED_ATTRIBUTE, key)
    if (textContent !== undefined) element.textContent = textContent
    document.head.appendChild(element)
    created.push(element)
  }

  if (resources.title !== undefined) document.title = resources.title

  for (const meta of resources.metas ?? []) upsert("meta", meta as unknown as Record<string, unknown>)
  for (const link of resources.links ?? []) upsert("link", link as unknown as Record<string, unknown>)

  for (const script of resources.scripts ?? []) {
    const { inline, ...attributes } = script
    // A script element only executes when appended, so `upsert`'s update branch
    // intentionally does not re-run an existing script.
    upsert("script", attributes as unknown as Record<string, unknown>, inline)
  }

  return () => {
    for (const element of created) element.remove()
  }
}

export type { HeadResources, LinkAttributes, MetaAttributes, ScriptAttributes }
