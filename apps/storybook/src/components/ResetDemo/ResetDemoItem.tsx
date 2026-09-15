import * as React from "react"
import Flex from "nice-react-flex"
import { getToken } from "nice-react-styles"
import Ink from "../../nice/Ink"
import Code from "../../nice/Code"

/** Shared iframe chrome; width/height/radius differ per desktop vs mobile. */
const frameChrome = {
  border: `1px solid ${getToken("borderColor")}`,
  borderRadius: getToken("borderRadius"),
  background: getToken("backgroundColor"),
}
const frameStyle = { ...frameChrome, width: 800, height: 600, maxWidth: getToken("contentMaxWidth") }
const frameStyleMobile = { ...frameChrome, width: 390, height: 800 }

/**
 * An `<iframe srcDoc>` whose own `<html>` mirrors the parent document's
 * `data-theme`. A srcDoc iframe is a separate document, so it never inherits the
 * `data-theme` the Storybook toggle sets on the parent root — inside it only
 * tokens.css's `@media (prefers-color-scheme)` fires, so it tracks the OS, not
 * the toggle. Copying the parent attribute in lets tokens.css's `[data-theme]`
 * rules win over the media query, so the frame follows the toggle. The reset's
 * `color-scheme: light dark` still hands native controls + scrollbars to the OS,
 * so it's pinned to a single scheme inline (inline beats the `:root` rule) to
 * match. Re-applied on mount, on toggle (a `data-theme` MutationObserver), and
 * on every (re)load.
 */
const ThemedFrame: React.FC<React.IframeHTMLAttributes<HTMLIFrameElement>> = (props) => {
  const ref = React.useRef<HTMLIFrameElement>(null)

  const applyTheme = React.useCallback(() => {
    const root = ref.current?.contentDocument?.documentElement
    if (!root) return
    const theme = document.documentElement.getAttribute("data-theme")
    if (theme) {
      root.setAttribute("data-theme", theme)
      root.style.colorScheme = theme === "night" ? "dark" : "light"
    } else {
      root.removeAttribute("data-theme")
      root.style.removeProperty("color-scheme")
    }
  }, [])

  React.useEffect(() => {
    applyTheme()
    const observer = new MutationObserver(applyTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    })
    return () => observer.disconnect()
  }, [applyTheme])

  return <iframe ref={ref} {...props} onLoad={applyTheme} />
}

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
