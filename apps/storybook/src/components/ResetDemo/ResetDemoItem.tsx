import * as React from "react"
import Flex from "nice-react-flex"
import { getToken } from "nice-react-styles"
import Ink from "../../nice/Ink"
import Code from "../../nice/Code"
import ThemedFrame from "../ThemedFrame"

/** Shared iframe chrome; width/height/radius differ per desktop vs mobile. */
const frameChrome = {
  borderRadius: getToken("borderRadius"),
  background: getToken("backgroundColor"),
}
const frameStyle = { ...frameChrome, width: 800, height: 600, maxWidth: "100%" }
const frameStyleMobile = { ...frameChrome, width: 390, height: 800 }

const htmlImport = (file: string) =>
  `<link rel="stylesheet" href="nice-styles/${file}">`
const cssImport = (file: string) => `@import "nice-styles/${file}";`
const jsImport = (file: string) => `import "nice-styles/${file}"`

/** One CodeBlock per import syntax — each lists every loaded file as a line. */
const importSyntaxes = [
  { heading: "HTML", language: "html", line: htmlImport },
  { heading: "CSS", language: "css", line: cssImport },
  { heading: "JS", language: "js", line: jsImport },
]

export interface ResetDemoItemProps {
  /** Human name for the frame; shown as the heading only when no layers are
   * applied, and used as the iframe's accessible title. */
  label: string
  /** Optional explanatory text shown beneath the heading; omitted renders no
   * description line. `ReactNode` so it can carry inline `code`. */
  description?: React.ReactNode
  /** CSS file names in the applied stack — rendered as the frame's title (a row
   * of code chips) and as one line per file in each HTML / CSS / JS import block. */
  files?: string[]
  /** The full HTML document rendered inside the frame. */
  srcDoc: string
  /** Render at mobile width (390px) instead of the desktop frame. */
  mobile?: boolean
}

/**
 * One frame in a {@link ResetDemo}: a title (the applied stack as a row of
 * `code` chips — e.g. `reset.css` `reset.spacing.css` — falling back to `label`
 * when no layers are applied), an optional description, three headed import
 * CodeBlocks — HTML `<link>`, CSS `@import`, JS `import` — each listing every
 * loaded CSS file as a line, and a "Demo"-headed `<iframe>` rendering the
 * composed HTML document at desktop or mobile width.
 */
const ResetDemoItem: React.FC<ResetDemoItemProps> = ({
  label,
  description,
  files,
  srcDoc,
  mobile,
}) => (
  <Flex direction="column" gap="large">
    <Ink
      as="h3"
      size="large"
      weight="semibold"
    >
      {label}
    </Ink>
    {description ? <Ink>{description}</Ink> : null}
    {files?.length ? (
      <Flex direction="column" gap="large">
        {importSyntaxes.map(syntax => (
          <Flex key={syntax.language} direction="column" gap="small">
            <Ink as="h4" size="base" weight="semibold">
              {syntax.heading}
            </Ink>
            <Code
              code={files.map(syntax.line).join("\n")}
              language={syntax.language}
              margin="none"
              showLabel={false}
            />
          </Flex>
        ))}
      </Flex>
    ) : null}
    <Flex direction="column" gap="small">
      <Ink as="h4" size="base" weight="semibold">
        Demo
      </Ink>
      <ThemedFrame
        title={label}
        srcDoc={srcDoc}
        style={mobile ? frameStyleMobile : frameStyle}
      />
    </Flex>
  </Flex>
)

export default ResetDemoItem
