import * as React from "react"
import { createHighlighterCoreSync } from "@shikijs/core"
import { createJavaScriptRegexEngine } from "@shikijs/engine-javascript"
import tsx from "@shikijs/langs/tsx"
import css from "@shikijs/langs/css"
import bash from "@shikijs/langs/bash"
import html from "@shikijs/langs/html"
import json from "@shikijs/langs/json"
import themeLight from "@shikijs/themes/min-light"
import themeDark from "@shikijs/themes/min-dark"
import Flex from "nice-react-flex"
import { CodeScroll } from "./CodeBlock.styles"
import { CodeLabel } from "./CodeLabel"

const themeNameLight = "min-light"
const themeNameDark = "min-dark"

// One sync singleton for every block. defaultColor:false emits the shared
// --shiki-light/--shiki-dark vars that preview-docs.css flips on the
// [data-theme="night"] pin. tsx covers JS/TS/JSX.
const highlighter = createHighlighterCoreSync({
  engine: createJavaScriptRegexEngine({ forgiving: true }),
  themes: [themeLight, themeDark],
  langs: [tsx, css, bash, html, json],
})

const ALIASES: Record<string, string> = {
  tsx: "tsx",
  ts: "tsx",
  typescript: "tsx",
  jsx: "tsx",
  js: "tsx",
  javascript: "tsx",
  css: "css",
  bash: "bash",
  sh: "bash",
  shell: "bash",
  html: "html",
  xml: "html",
  json: "json",
}

const resolveLang = (language?: string): string =>
  ALIASES[(language ?? "").toLowerCase()] ?? "text"

interface CodeBlockBodyProps {
  code: string
  language?: string
  /** Show the language label in the top-right corner. */
  showLabel: boolean
  /** Inline blocks have no chrome, so the label is suppressed. */
  inline: boolean
  /**
   * Content-sized layout: the code wrapper shrinks to its content (`fit`) instead
   * of growing to fill the row (`grow`), and the label switches to in-flow.
   */
  fit: boolean
}

/**
 * Inner content of a CodeBlock: the Shiki dual-theme HTML in a horizontal scroll
 * container, plus the optional language label. Split out from CodeBlock so the
 * outer component owns only the card chrome, click/copy, and fit layout.
 */
export const CodeBlockBody: React.FC<CodeBlockBodyProps> = ({
  code,
  language,
  showLabel,
  inline,
  fit,
}) => (
  <Flex gap="base">
    <CodeScroll gap="large" grow={1}>
      {/* fit: shrink to content (width: max-content); otherwise fill the row. */}
      <Flex fit={fit} grow={fit ? undefined : 1}>
        <div
          dangerouslySetInnerHTML={{
            __html: highlighter.codeToHtml(code.replace(/\n$/, ""), {
              lang: resolveLang(language),
              themes: { light: themeNameLight, dark: themeNameDark },
              defaultColor: false,
            }),
          }}
        />
      </Flex>
    </CodeScroll>
    {showLabel && !inline && <CodeLabel language={language} fit={fit} />}
  </Flex>
)
