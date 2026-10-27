/**
 * Prebuild generator: writes `src/generated/spinner.ts`.
 *
 * Renders the real `<Icon name="spinner" size="larger" />` from @niceprototypes/icon
 * to static markup (react-dom/server + styled-components ServerStyleSheet), and
 * reads every token value the overlay CSS needs from @niceprototypes/styles (`getToken`
 * with `as: "value"` / `as: "key"` and theme / breakpoint pins). The output is
 * committed, so the published package carries no dependency on the Nice
 * packages, React or styled-components.
 *
 * Run with `npm run generate` (also runs as `prebuild`).
 */
import { createRequire } from "node:module"
import { writeFileSync, mkdirSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const require = createRequire(join(root, "package.json"))
const esbuild = require("esbuild")
const { getToken, getBreakpoint } = await import(require.resolve("@niceprototypes/styles/core"))

// ── Spinner markup + styles ──────────────────────────────────────────────────
// Rendered from an esbuild bundle rather than plain Node imports:
// @niceprototypes/icon's `main` is CommonJS inside a "type": "module" package, and
// styled-components has no `exports` map, so Node's ESM loader can load neither
// correctly. Preferring each package's `module` field gives esbuild one ESM
// graph with a single React / styled-components instance. CSS side-effect
// imports (@niceprototypes/styles' tokens.css) are irrelevant to static markup.
const renderEntry = `
  import React from "react"
  import { renderToStaticMarkup } from "react-dom/server"
  import { ServerStyleSheet } from "styled-components"
  import Icon from "@niceprototypes/icon"
  const sheet = new ServerStyleSheet()
  try {
    module.exports = {
      html: renderToStaticMarkup(sheet.collectStyles(React.createElement(Icon, { name: "spinner", size: "larger" }))),
      css: sheet.getStyleTags(),
    }
  } finally {
    sheet.seal()
  }
`
const bundle = await esbuild.build({
  stdin: { contents: renderEntry, resolveDir: root, loader: "js" },
  bundle: true,
  platform: "node",
  format: "cjs",
  mainFields: ["module", "main"],
  loader: { ".css": "empty" },
  define: { "process.env.NODE_ENV": '"production"' },
  write: false,
  logLevel: "error",
})
const rendered = { exports: {} }
new Function("module", "exports", "require", bundle.outputFiles[0].text)(rendered, rendered.exports, require)
const { html: rawHtml, css: rawCss } = rendered.exports

// Strip the <style> wrapper, styled-components' comment markers and its
// rehydration bookkeeping rules.
let css = rawCss
  .replace(/<\/?style[^>]*>/g, "")
  .replace(/\/\*!sc\*\//g, "")
  .replace(/data-styled\.g\d+\[id="[^"]+"\]\{content:"[^"]*"\}/g, "")
  .replace(/\s*\n\s*/g, "")

// Namespace the generated class and keyframes names so the overlay's rules can
// never touch (or be touched by) the host page's own styled-components output.
const classAttr = rawHtml.match(/^<div class="([^"]+)"/)
if (!classAttr) throw new Error("generateSpinner: unexpected Icon markup (no wrapper class)")
const styleClass = classAttr[1].split(/\s+/).find(name => css.includes(`.${name}`))
if (!styleClass) throw new Error("generateSpinner: no styled class found in the Icon markup")
const keyframes = css.match(/@keyframes ([\w-]+)/)
if (!keyframes) throw new Error("generateSpinner: spinner keyframes not found")

const html = rawHtml.replace(`class="${classAttr[1]}"`, `class="nsb-spinner"`)
css = css.split(`.${styleClass}`).join(".nsb-spinner").split(keyframes[1]).join("nsb-spin")

// ── Token values ─────────────────────────────────────────────────────────────
const value = (address, options = {}) => getToken(address, undefined, { as: "value", ...options })
const key = address => getToken(address, undefined, { as: "key" })

const tokens = {
  keys: {
    iconSize: key("icon.size:larger"),
    iconColor: key("icon.color:base"),
    iconStrokeWidth: key("icon.strokeWidth:base"),
    iconStrokeWidthScale: key("icon.strokeWidthScale:base"),
    iconAnimationDuration: key("icon.animationDuration:base"),
  },
  iconSize: value("icon.size:larger"),
  iconSizeBreakpoints: ["tablet", "laptop", "desktop"].map(name => ({
    media: getBreakpoint(`${name}+`),
    value: value("icon.size:larger", { breakpoint: name }),
  })),
  iconStrokeWidth: value("icon.strokeWidth:base"),
  iconAnimationDuration: value("icon.animationDuration:base"),
  themes: {
    day: {
      background: getToken("backgroundColor", "base", { as: "value", theme: "day" }),
      color: getToken("color", "base", { as: "value", theme: "day" }),
      iconStrokeWidthScale: value("icon.strokeWidthScale:base", { theme: "day" }),
    },
    night: {
      background: getToken("backgroundColor", "base", { as: "value", theme: "night" }),
      color: getToken("color", "base", { as: "value", theme: "night" }),
      iconStrokeWidthScale: value("icon.strokeWidthScale:base", { theme: "night" }),
    },
  },
}

// Every var() the spinner CSS reads must be one the overlay sets.
for (const used of css.match(/var\(--[\w-]+\)/g) || []) {
  const name = used.slice(4, -1)
  if (!Object.values(tokens.keys).includes(name)) {
    throw new Error(`generateSpinner: spinner CSS reads ${name}, which the overlay does not set`)
  }
}

// ── Emit ─────────────────────────────────────────────────────────────────────
const out = `// Generated by scripts/generateSpinner.mjs — do not edit by hand.
// Source: <Icon name="spinner" size="larger" /> from @niceprototypes/icon, token
// values from @niceprototypes/styles. Regenerate with \`npm run generate\`.

/** Static markup of the spinner icon (wrapper class namespaced to \`nsb-spinner\`). */
export const SPINNER_HTML = ${JSON.stringify(html)}

/** The icon's styled-components rules (class and keyframes namespaced). */
export const SPINNER_CSS = ${JSON.stringify(css)}

/** Token values (and the custom-property names the spinner CSS reads). */
export const SPINNER_TOKENS = ${JSON.stringify(tokens, null, 2)} as const
`

mkdirSync(join(root, "src/generated"), { recursive: true })
writeFileSync(join(root, "src/generated/spinner.ts"), out)
console.log(`generateSpinner: html ${Buffer.byteLength(html)} B, css ${Buffer.byteLength(css)} B`)
