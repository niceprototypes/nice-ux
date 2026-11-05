import * as React from "react"
import Markdown, { type MarkdownLinkComponentType } from "@niceprototypes/markdown"
import type { AppRouterType } from "./App.types"
import { StyledAppDocs } from "./App.styles"

/**
 * A docs page: its markdown through Markdown, links on the router when they stay in the app (a
 * path from `/`), as plain anchors otherwise.
 */
const AppDocs = ({ text, Link }: { text: string; Link: AppRouterType["Link"] }) => {
  // One component per router, so Markdown's memoised blocks keep it across renders.
  const linkComponent = React.useMemo<MarkdownLinkComponentType>(
    () =>
      ({ href, children }) =>
        href.startsWith("/") ? <Link to={href}>{children}</Link> : <a href={href}>{children}</a>,
    [Link],
  )
  return (
    <StyledAppDocs>
      <Markdown linkComponent={linkComponent}>{text}</Markdown>
    </StyledAppDocs>
  )
}

export default AppDocs
