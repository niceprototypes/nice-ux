import * as React from "react"
import Flex from "nice-react-flex"
import Typography from "../../nice/Typography"
import { DataTable, withCopyAffordance } from "../DataTable"
import type { DataColumn } from "../DataTable"
import { CodeBlock } from "../CodeBlock"

/** Shared iframe chrome; width/height/radius differ per desktop vs mobile. */
const frameChrome = {
  border: "1px solid rgba(128,128,128,0.4)",
  background: "#fff",
}
const frameStyle = { ...frameChrome, width: 720, height: 720 }
const frameStyleMobile = { ...frameChrome, width: 390, height: 800 }

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
 * when no layers are applied), an import table (each loaded CSS file shown three
 * ways — HTML `<link>`, CSS `@import`, JS `import`, a CodeBlock per cell), and an
 * `<iframe>` rendering the composed HTML document at desktop or mobile width.
 */
const ResetDemoItem: React.FC<ResetDemoItemProps> = ({
  label,
  files,
  srcDoc,
  mobile,
}) => (
  <React.Fragment>
    <Typography
      as="h3"
      size="large"
      weight="semibold"
      code={!!files?.length}
    >
      {label}
    </Typography>
    {files?.length ? (
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
                          <CodeBlock
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
                          <CodeBlock
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
                          <CodeBlock
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
    ) : null}
    <iframe
      title={label}
      srcDoc={srcDoc}
      style={mobile ? frameStyleMobile : frameStyle}
    />
  </React.Fragment>
)

export default ResetDemoItem
