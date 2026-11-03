// Code example configs — one ComponentExample per facet, shaped like Button's
// (src/dataTables/data/tables/componentDemoTable). ComponentDocs renders each entry as a section of the
// Code docs page, sorted by name.
import Code from "@niceprototypes/code"
import type { ComponentExample } from "./examples.types"

export type { ComponentExample, ExampleVariant } from "./examples.types"

const source = `const total = items.reduce((sum, item) => sum + item.price, 0)`

const sources: Record<string, string> = {
  tsx: source,
  css: `.card {\n  color: var(--np--color);\n}`,
  bash: `npm i @niceprototypes/code`,
  html: `<button type="button">Save</button>`,
  json: `{ "name": "@niceprototypes/code" }`,
}

export const codeCode = {
  name: "code",
  description: "The source string to highlight and render. A trailing newline is stripped. Required.",
  variants: ["single line", "multi-line"],
  default: "single line",
  preview: variant => (
    <Code
      code={variant === "multi-line" ? sources.css : source}
      language={variant === "multi-line" ? "css" : "tsx"}
    />
  ),
  code: variant =>
    variant === "multi-line" ? `<Code code={css} language="css" />` : `<Code code={source} language="tsx" />`,
} satisfies ComponentExample

export const codeLanguage = {
  name: "language",
  description:
    "Fence language, mapped to a grammar: tsx (also ts, typescript, jsx, js, javascript), css, bash (also sh, shell), html (also xml) and json. Anything else, or none, renders as plain text.",
  variants: ["tsx", "css", "bash", "html", "json", "none"],
  default: "none",
  // The bash sample is an install command, which renders as an inline chip.
  preview: variant => (
    <Code
      code={sources[variant] ?? source}
      language={variant === "none" ? undefined : variant}
      inlined={variant === "bash"}
    />
  ),
  code: variant =>
    variant === "none"
      ? `<Code code={source} />`
      : `<Code code={source} language="${variant}"${variant === "bash" ? " inlined" : ""} />`,
} satisfies ComponentExample

export const codeShowLabel = {
  name: "showLabel",
  description: "Shows the copy icon (named \"Copy {language}\" for screen readers) in the top-right corner of the card. Inlined code never shows it.",
  variants: ["true", "false"],
  default: "true",
  preview: variant => (
    <Code
      code={source}
      language="tsx"
      showLabel={variant === "true"}
    />
  ),
  code: variant =>
    variant === "false" ? `<Code code={source} language="tsx" showLabel={false} />` : `<Code code={source} language="tsx" />`,
} satisfies ComponentExample

export const codeCopyOnClick = {
  name: "copyOnClick",
  description: "Copies the code to the clipboard when the block is clicked, and makes it clickable.",
  variants: ["true", "false"],
  default: "true",
  preview: variant => (
    <Code
      code={source}
      language="tsx"
      copyOnClick={variant === "true"}
    />
  ),
  code: variant =>
    variant === "false"
      ? `<Code code={source} language="tsx" copyOnClick={false} />`
      : `<Code code={source} language="tsx" />`,
} satisfies ComponentExample

export const codeInlined = {
  name: "inlined",
  description: "Renders the code as a chip inside a line of text, with a \"Copy to clipboard\" tooltip; no card, copy icon or drag bar.",
  variants: ["false", "true"],
  default: "false",
  preview: variant => (
    <Code
      code={source}
      language="tsx"
      inlined={variant === "true"}
    />
  ),
  code: variant =>
    variant === "true" ? `<Code code={source} language="tsx" inlined />` : `<Code code={source} language="tsx" />`,
} satisfies ComponentExample

export const codeFit = {
  name: "fit",
  description: "false (the default) fills the container, long lines scrolling inside; true shrinks the card to its content width.",
  variants: ["true", "false"],
  default: "false",
  preview: variant => (
    <Code
      code={source}
      language="tsx"
      fit={variant === "true"}
    />
  ),
  code: variant => (variant === "true" ? `<Code code={source} language="tsx" fit />` : `<Code code={source} language="tsx" />`),
} satisfies ComponentExample

export const codeMargin = {
  name: "margin",
  description: "Top and bottom margin, as a gap token variant.",
  variants: ["none", "smaller", "small", "base", "large", "larger"],
  default: "large",
  preview: variant => (
    <Code
      code={source}
      language="tsx"
      margin={variant}
    />
  ),
  code: variant =>
    variant === "large" ? `<Code code={source} language="tsx" />` : `<Code code={source} language="tsx" margin="${variant}" />`,
} satisfies ComponentExample

/** Enough lines to pass the collapsed height. */
const longSource = Array.from({ length: 24 }, (_, index) => `const line${index + 1} = items[${index}]`).join("\n")

export const codeMaxHeight = {
  name: "maxHeight",
  description:
    "Collapsed height of a card block, as a code.maxHeight token variant. Taller code is cut off with a fade above a drag bar (pointer, arrow keys, Home, End) that shows between the cap and the full code; shorter code renders in full. \"none\" never collapses.",
  variants: ["base", "none"],
  default: "base",
  preview: variant => (
    <Code
      code={longSource}
      language="tsx"
      maxHeight={variant}
    />
  ),
  code: variant =>
    variant === "base" ? `<Code code={source} language="tsx" />` : `<Code code={source} language="tsx" maxHeight="none" />`,
} satisfies ComponentExample

/** Every new Code example facet — each one a section of the Code docs page. */
export const codeExamples = {
  code: codeCode,
  language: codeLanguage,
  showLabel: codeShowLabel,
  copyOnClick: codeCopyOnClick,
  inlined: codeInlined,
  fit: codeFit,
  margin: codeMargin,
  maxHeight: codeMaxHeight,
} satisfies Record<string, ComponentExample>

