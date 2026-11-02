import * as React from "react"
import Code from "@niceprototypes/code"
import { ShikiPre } from "@niceprototypes/docs/components/ShikiPre"
import DocsPage from "../DocsPage"

/** Markdown inline code as the inline Code chip; fenced code goes through ShikiPre, which reads its own `<code>`. */
const InlineCode = ({ children }: { children?: React.ReactNode }) => <Code code={String(children)} inlined margin="none" />

/** An MDX page module: its default export takes the element overrides. */
export type MdxModuleType = { default: React.ComponentType<{ components?: Record<string, React.ComponentType<never>> }> }

/**
 * MdxPage
 *
 * One Storybook MDX page on the docs site: its content as the page's one section, fenced code
 * through Code (ShikiPre), inline code as Code chips, the column capped unless the page's data says `wrapped: false`.
 */
const MdxPage: React.FC<{ id: string; label: string; wrapped: boolean; Content: MdxModuleType["default"] }> = ({ id, label, wrapped, Content }) => (
  <DocsPage wrapped={wrapped} sections={[{ id, label, content: <Content components={{ pre: ShikiPre, code: InlineCode }} /> }]} />
)

export default MdxPage
