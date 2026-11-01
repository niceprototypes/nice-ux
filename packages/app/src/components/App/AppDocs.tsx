import * as React from "react"
import Markdown from "markdown-to-jsx/react"
import Ink from "@niceprototypes/ink"
import type { AppRouterType } from "./App.types"
import { StyledAppDocs } from "./App.styles"

type Children = { children?: React.ReactNode }

/**
 * A docs page: its markdown, headings and paragraphs through Ink, links on the router when they
 * stay in the app (a path from `/`), as plain anchors otherwise.
 */
const AppDocs = ({ text, Link }: { text: string; Link: AppRouterType["Link"] }) => {
  const overrides = React.useMemo(
    () => ({
      h1: ({ children }: Children) => <Ink as="h1" size="larger" weight="semibold">{children}</Ink>,
      h2: ({ children }: Children) => <Ink as="h2" size="large" weight="semibold">{children}</Ink>,
      h3: ({ children }: Children) => <Ink as="h3" weight="semibold">{children}</Ink>,
      p: ({ children }: Children) => <Ink as="p">{children}</Ink>,
      a: ({ children, href = "" }: Children & { href?: string }) =>
        href.startsWith("/") ? <Link to={href}>{children}</Link> : <a href={href}>{children}</a>,
    }),
    [Link],
  )
  return (
    <StyledAppDocs>
      <Markdown options={{ overrides }}>{text}</Markdown>
    </StyledAppDocs>
  )
}

export default AppDocs
