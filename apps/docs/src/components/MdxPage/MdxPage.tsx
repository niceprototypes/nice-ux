import * as React from "react"
import { ShikiPre } from "@niceprototypes/docs/components/ShikiPre"
import DocsPage from "../DocsPage"

/** An MDX page module: its default export takes the element overrides. */
export type MdxModuleType = { default: React.ComponentType<{ components?: Record<string, React.ComponentType<never>> }> }

/**
 * MdxPage
 *
 * One Storybook MDX page on the docs site: its content as the page's one section, fenced code
 * through Code (ShikiPre), the column capped unless the page's data says `wrapped: false`.
 */
const MdxPage: React.FC<{ id: string; label: string; wrapped: boolean; Content: MdxModuleType["default"] }> = ({ id, label, wrapped, Content }) => (
  <DocsPage wrapped={wrapped} sections={[{ id, label, content: <Content components={{ pre: ShikiPre }} /> }]} />
)

export default MdxPage
