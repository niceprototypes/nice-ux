import * as React from "react"
import Flex from "nice-react-flex"
import Ink from "../../nice/Ink"
import { DataTable, withCopyAffordance } from "../DataTable"
import type { DataColumn } from "../DataTable"
import Code from "nice-react-code"

/** Shared iframe chrome; width/height/radius differ per desktop vs mobile. */
const frameChrome = {
  border: "1px solid rgba(128,128,128,0.4)",
  background: "#fff",
}
const frameStyle = { ...frameChrome, width: 800, height: 600 }
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

/** The import-reference columns — one CodeBlock cell per syntax, per file. */
const importColumns: DataColumn[] = [
  { key: "html", header: "HTML import", render: "node" },
  { key: "css", header: "CSS import", render: "node" },
  { key: "js", header: "JS import", render: "node" },
]
const htmlImport = (file: string) =>
  `<link rel="stylesheet" href="nice-styles/${file}">`
const cssImport = (file: string) => `@import "nice-styles/${file}";`
const jsImport = (file: string) => `import "nice-styles/${file}"`

export interface ResetDemoItemProps {
  /** Human name for the frame; shown as the heading only when no layers are
   * applied, and used as the iframe's accessible title. */
  label: string
  /** Optional explanatory text shown beneath the heading; omitted renders no
   * description line. `ReactNode` so it can carry inline `code`. */
  description?: React.ReactNode
  /** CSS file names in the applied stack — rendered as the frame's title (a row
   * of code chips) and as import-table rows, each shown three ways. */
  files?: string[]
  /** The full HTML document rendered inside the frame. */
  srcDoc: string
  /** Render at mobile width (390px) instead of the desktop frame. */
  mobile?: boolean
}

/**
 * One frame in a {@link ResetDemo}: a title (the applied stack as a row of
 * `code` chips — e.g. `reset.css` `reset.spacing.css` — falling back to `label`
 * when no layers are applied), an optional description, an import table (each
 * loaded CSS file shown three ways — HTML `<link>`, CSS `@import`, JS `import`,
 * a CodeBlock per cell), and an `<iframe>` rendering the composed HTML document
 * at desktop or mobile width.
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
      <Flex direction="column" margin="none none small" className="sb-unstyled">
        <DataTable
          showLines={false}
          columns={importColumns}
          columnWidths={["32em", "22em"]}
          rowSpacing="none"
          tables={[
            {
              rows: [
                {
                  id: "imports",
                  values: [
                    <Flex direction="column">
                      {files.map(file => (
                        <React.Fragment key={file}>
                          {withCopyAffordance(
                            <Code
                              code={htmlImport(file)}
                              language="html"
                              inlined
                              margin="none"
                              showLabel={false}
                            />
                          )}
                        </React.Fragment>
                      ))}
                    </Flex>,
                    <Flex direction="column">
                      {files.map(file => (
                        <React.Fragment key={file}>
                          {withCopyAffordance(
                            <Code
                              code={cssImport(file)}
                              language="css"
                              inlined
                              margin="none"
                              showLabel={false}
                            />
                          )}
                        </React.Fragment>
                      ))}
                    </Flex>,
                    <Flex direction="column">
                      {files.map(file => (
                        <React.Fragment key={file}>
                          {withCopyAffordance(
                            <Code
                              code={jsImport(file)}
                              language="js"
                              inlined
                              margin="none"
                              showLabel={false}
                            />
                          )}
                        </React.Fragment>
                      ))}
                    </Flex>,
                  ],
                },
              ],
            },
          ]}
        />
      </Flex>
    ) : null}
    <ThemedFrame
      title={label}
      srcDoc={srcDoc}
      style={mobile ? frameStyleMobile : frameStyle}
    />
  </Flex>
)

export default ResetDemoItem
