/**
 * Shiki highlighting for the Code component.
 *
 * One sync singleton highlighter for every block. `defaultColor: false` emits the
 * shared `--shiki-light` / `--shiki-dark` CSS vars per token span; Code.styles.ts
 * picks which one applies on the `[data-theme="night"]` pin. The `tsx` grammar
 * covers JS/TS/JSX.
 *
 * Internal utility — not exported from the package.
 */
import { createHighlighterCoreSync } from "@shikijs/core"
import { createJavaScriptRegexEngine } from "@shikijs/engine-javascript"
import tsx from "@shikijs/langs/tsx"
import css from "@shikijs/langs/css"
import bash from "@shikijs/langs/bash"
import html from "@shikijs/langs/html"
import json from "@shikijs/langs/json"
import themeLight from "@shikijs/themes/min-light"
import themeDark from "@shikijs/themes/min-dark"

const themeNameLight = "min-light"
const themeNameDark = "min-dark"

const highlighter = createHighlighterCoreSync({
  engine: createJavaScriptRegexEngine({ forgiving: true }),
  themes: [themeLight, themeDark],
  langs: [tsx, css, bash, html, json],
})

// Fence language → registered grammar. Anything unmapped falls back to "text".
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

/**
 * Highlight `code` as Shiki dual-theme HTML. The trailing newline is stripped so
 * single-line snippets don't render a blank last line.
 */
export function highlightCode(code: string, language?: string): string {
  return highlighter.codeToHtml(code.replace(/\n$/, ""), {
    lang: resolveLang(language),
    themes: { light: themeNameLight, dark: themeNameDark },
    defaultColor: false,
  })
}
