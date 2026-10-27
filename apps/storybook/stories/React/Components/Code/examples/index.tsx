// Code example configs — one ComponentExample per facet, shaped like Button's
// (src/dataTables/data/tables/componentDemoTable). Key order in `codeExamples`
// is the Code/Docs-page order; each Code/<facet>.mdx renders one entry.
import Code from "nice-react-code"
import type { ComponentExample } from "./examples.types"

export type { ComponentExample, ExampleVariant } from "./examples.types"

const source = `const total = items.reduce((sum, item) => sum + item.price, 0)`

const sources: Record<string, string> = {
  tsx: source,
  css: `.card {\n  color: var(--np--color);\n}`,
  bash: `npm i nice-react-code`,
  html: `<button type="button">Save</button>`,
  json: `{ "name": "nice-react-code" }`,
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
  preview: variant => (
    <Code
      code={sources[variant] ?? source}
      language={variant === "none" ? undefined : variant}
    />
  ),
  code: variant => (variant === "none" ? `<Code code={source} />` : `<Code code={source} language="${variant}" />`),
} satisfies ComponentExample

export const codeShowLabel = {
  name: "showLabel",
  description: "Shows the language label in the top-right corner of the card. Inlined code never shows it.",
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
  description: "Strips the card chrome and renders the code flush inline as plain code text, without the label.",
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
  description: "true shrinks the card to its content width; false fills the row.",
  variants: ["true", "false"],
  default: "true",
  preview: variant => (
    <Code
      code={sources.bash}
      language="bash"
      fit={variant === "true"}
    />
  ),
  code: variant =>
    variant === "false" ? `<Code code={source} language="bash" fit={false} />` : `<Code code={source} language="bash" />`,
} satisfies ComponentExample

export const codeMargin = {
  name: "margin",
  description: "Top and bottom margin, as a gap token variant.",
  variants: ["none", "smaller", "small", "base", "large", "larger"],
  default: "large",
  preview: variant => (
    <Code
      code={sources.bash}
      language="bash"
      margin={variant}
    />
  ),
  code: variant =>
    variant === "large" ? `<Code code={source} language="bash" />` : `<Code code={source} language="bash" margin="${variant}" />`,
} satisfies ComponentExample

/** Every new Code example facet — key order is the Code/Docs-page order. */
export const codeExamples = {
  code: codeCode,
  language: codeLanguage,
  showLabel: codeShowLabel,
  copyOnClick: codeCopyOnClick,
  inlined: codeInlined,
  fit: codeFit,
  margin: codeMargin,
} satisfies Record<string, ComponentExample>

/** Code facets in Docs-page order. */
export const codeExampleList: ComponentExample[] = Object.values(codeExamples)
