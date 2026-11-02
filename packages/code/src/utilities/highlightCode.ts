/**
 * Shiki highlighting for the Code component.
 *
 * One sync singleton highlighter for every block. The theme is built from the
 * `code.syntaxColor` component tokens: every scope's colour is a `var()` from
 * getToken, so the palette and its day/night values live in nice-styles and the
 * cascade (prefers-color-scheme, `[data-theme]` pins) picks the theme. The `tsx`
 * grammar covers JS/TS/JSX.
 *
 * Internal utility — not exported from the package.
 */
import { createHighlighterCoreSync, type ThemeRegistration } from "@shikijs/core"
import { createJavaScriptRegexEngine } from "@shikijs/engine-javascript"
import tsx from "@shikijs/langs/tsx"
import css from "@shikijs/langs/css"
import bash from "@shikijs/langs/bash"
import html from "@shikijs/langs/html"
import json from "@shikijs/langs/json"
import { getToken, type TokenVariants } from "@niceprototypes/styles"

const syntaxColor = (variant: TokenVariants["code.syntaxColor"]) => getToken("code.syntaxColor", variant)

/**
 * TextMate scopes per palette role, after Atlassian's code palette: keywords,
 * numbers and booleans blue; strings green; JSX/HTML tags purple; constants and
 * CSS/JSON property names teal; comments dim; operators, arrows, JSX attribute
 * names, punctuation and identifiers the base colour. The more specific scope wins, so
 * `keyword.operator` reads base under `keyword`, and a `const` declaration's
 * name reads base while an UPPER_CASE constant reads teal.
 */
const theme: ThemeRegistration = {
  name: "nice",
  type: "light",
  colors: {
    "editor.foreground": syntaxColor("base"),
    "editor.background": "transparent",
  },
  tokenColors: [
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: syntaxColor("comment") },
    },
    {
      scope: ["string", "punctuation.definition.string", "string.template"],
      settings: { foreground: syntaxColor("string") },
    },
    {
      scope: ["keyword", "storage"],
      settings: { foreground: syntaxColor("keyword"), fontStyle: "bold" },
    },
    {
      scope: ["constant.numeric", "constant.language", "variable.language", "support.type.primitive"],
      settings: { foreground: syntaxColor("keyword") },
    },
    {
      scope: [
        "keyword.operator",
        "punctuation.definition.template-expression",
        "meta.embedded",
        "meta.definition.variable variable.other.constant",
        "storage.type.function.arrow",
        "entity.other.attribute-name",
      ],
      settings: { foreground: syntaxColor("base"), fontStyle: "" },
    },
    {
      scope: ["entity.name.tag", "support.class.component", "punctuation.definition.tag"],
      settings: { foreground: syntaxColor("tag") },
    },
    {
      scope: [
        "variable.other.constant",
        "variable.other.enummember",
        "support.constant",
        "constant.other",
        "support.type.property-name",
      ],
      settings: { foreground: syntaxColor("constant") },
    },
  ],
}

const highlighter = createHighlighterCoreSync({
  engine: createJavaScriptRegexEngine({ forgiving: true }),
  themes: [theme],
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
 * Highlight `code` as Shiki HTML in the token theme. The trailing newline is
 * stripped so single-line snippets don't render a blank last line.
 */
export function highlightCode(code: string, language?: string): string {
  return highlighter.codeToHtml(code.replace(/\n$/, ""), {
    lang: resolveLang(language),
    theme: theme.name!,
  })
}
