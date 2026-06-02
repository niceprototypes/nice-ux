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
import { ShikiDiv } from "./ShikiCode.styles"

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

interface ShikiCodeProps {
  code: string
  language?: string
}

/** Render a code string as Shiki dual-theme HTML. Use anywhere code is shown. */
export const ShikiCode: React.FC<ShikiCodeProps> = ({ code, language }) => (
  <ShikiDiv
    dangerouslySetInnerHTML={{
      __html: highlighter.codeToHtml(code.replace(/\n$/, ""), {
        lang: resolveLang(language),
        themes: { light: themeNameLight, dark: themeNameDark },
        defaultColor: false,
      }),
    }}
  />
)

/**
 * Replacement for the markdown `pre` component in MDX docs.
 *
 * Storybook's default routes fenced code through its own <Source> block, which
 * renders multi-line blocks empty once an upstream highlighter is involved.
 * Reading the raw code straight off the child <code> element and rendering
 * Shiki ourselves bypasses Storybook's code path entirely — single- and
 * multi-line blocks both work.
 */
export const ShikiPre = ({ children, ...rest }: { children?: React.ReactNode }) => {
  const codeEl = React.Children.toArray(children).find(React.isValidElement) as
    | React.ReactElement<{ className?: string; children?: React.ReactNode }>
    | undefined

  const className = codeEl?.props?.className ?? ""
  const raw = codeEl?.props?.children
  const code = typeof raw === "string" ? raw.replace(/\n$/, "") : ""
  const langMatch = /language-(\w+)/.exec(className)

  // Not a fenced code block we can highlight — leave it as a plain <pre>.
  if (!langMatch || !code) return <pre {...rest}>{children}</pre>

  return (
    <ShikiCode
      code={code}
      language={langMatch[1]}
    />
  )
}
