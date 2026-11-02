import * as React from "react"
import Code from "@niceprototypes/code"
import type { ContentsItemType } from "@niceprototypes/contents"
import { ShikiPre } from "@niceprototypes/docs/components/ShikiPre"
import DocsPage from "../DocsPage"
import { StyledMdxContent } from "./MdxPage.styles"

/** Markdown inline code as the inline Code chip; fenced code goes through ShikiPre, which reads its own `<code>`. */
const InlineCode = ({ children }: { children?: React.ReactNode }) => <Code code={String(children)} inlined margin="none" />

/** An MDX page module: its default export takes the element overrides. */
export type MdxModuleType = { default: React.ComponentType<{ components?: Record<string, React.ComponentType<never>> }> }

/** A heading's text as an anchor id: lower case, runs of other characters as one dash. */
const slugOf = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")

/**
 * The page's headings as Contents rows, each h3 under the h2 before it. A heading without an
 * id gets one from its text, made unique on the page.
 */
const headingsOf = (root: HTMLElement): ContentsItemType[] => {
  const taken = new Set<string>()
  const rows: { id: string; label: string; items: ContentsItemType[] }[] = []
  for (const heading of root.querySelectorAll<HTMLElement>("h2, h3")) {
    const label = heading.textContent?.trim() ?? ""
    if (!label) continue
    if (!heading.id) {
      const base = slugOf(label) || "section"
      let id = base
      for (let n = 2; taken.has(id) || document.getElementById(id); n++) id = `${base}-${n}`
      heading.id = id
    }
    taken.add(heading.id)
    const row = { id: heading.id, label, items: [] as ContentsItemType[] }
    if (heading.tagName === "H3" && rows.length) rows[rows.length - 1].items.push(row)
    else rows.push(row)
  }
  return rows.map(({ items, ...row }) => (items.length ? { ...row, items } : row))
}

/**
 * MdxPage
 *
 * One MDX page on the docs site: its content as the page's one section, fenced code through
 * Code (ShikiPre), inline code as Code chips, Contents listing its headings, the column capped
 * unless the page's data says `wrapped: false`.
 */
const MdxPage: React.FC<{ id: string; label: string; wrapped: boolean; Content: MdxModuleType["default"] }> = ({ id, label, wrapped, Content }) => {
  const content = React.useRef<HTMLDivElement>(null)
  const [contents, setContents] = React.useState<ContentsItemType[]>()
  React.useLayoutEffect(() => {
    if (content.current) setContents(headingsOf(content.current))
  }, [Content])
  return (
    <DocsPage
      wrapped={wrapped}
      contents={contents?.length ? contents : undefined}
      sections={[
        {
          id,
          label,
          content: (
            <StyledMdxContent ref={content}>
              <Content components={{ pre: ShikiPre, code: InlineCode }} />
            </StyledMdxContent>
          ),
        },
      ]}
    />
  )
}

export default MdxPage
