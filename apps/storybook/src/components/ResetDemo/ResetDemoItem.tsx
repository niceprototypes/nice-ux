import * as React from "react"
import Flex from "nice-react-flex"
import Typography from "../../nice/Typography"
import { DataTable } from "../DataTable"
import type { DataColumn } from "../DataTable"
import { CodeBlock } from "../CodeBlock"

/** Shared iframe chrome; width/height/radius differ per desktop vs mobile. */
const frameChrome = {
  border: "1px solid rgba(128,128,128,0.4)",
  background: "#fff",
}
const frameStyle = { ...frameChrome, width: 720, height: 720, borderRadius: 6 }
const frameStyleMobile = { ...frameChrome, width: 390, height: 800, borderRadius: 16 }

/** The import-reference columns — one CodeBlock cell per syntax, per file. */
const importColumns: DataColumn[] = [
  { key: "html", header: "HTML import", render: "node" },
  { key: "css", header: "CSS import", render: "node" },
  { key: "js", header: "JS import", render: "node" },
]
const htmlImport = (file: string) => `<link rel="stylesheet" href="nice-styles/${file}">`
const cssImport = (file: string) => `@import "nice-styles/${file}";`
const jsImport = (file: string) => `import "nice-styles/${file}"`

export interface ResetDemoItemProps {
  /** Heading above the import table (e.g. "Standard CSS", "Reset + Colors"). */
  label: React.ReactNode
  /** CSS file names — one import-table row each, shown three ways. */
  files?: string[]
  /** Accessible iframe title — must be unique per item. */
  title: string
  /** The full HTML document rendered inside the frame. */
  srcDoc: string
  /** Render at mobile width (390px) instead of the desktop frame. */
  mobile?: boolean
}

/**
 * One frame in a {@link ResetDemo}: an `<h3>` heading, an import table (each
 * loaded CSS file shown three ways — HTML `<link>`, CSS `@import`, JS `import`,
 * a CodeBlock per cell), and an `<iframe>` rendering the composed HTML document
 * at desktop or mobile width.
 */
const ResetDemoItem: React.FC<ResetDemoItemProps> = ({ label, files, title, srcDoc, mobile }) => (
  <Flex direction="column" gap="large">
    <Typography as="h3" size="large" weight="semibold">{label}</Typography>
    <iframe title={title} srcDoc={srcDoc} style={mobile ? frameStyleMobile : frameStyle} />
    {files?.length ? (
      <DataTable
        showLines={false}
        columns={importColumns}
        columnWidths={["32em", "22em"]}
        tables={[
          {
            rows: [
              {
                id: "imports",
                values: [
                  <Flex direction="column" gap="small">
                    {files.map(file => (
                      <CodeBlock key={file} code={htmlImport(file)} language="html" inline margin="none" showLabel={false} />
                    ))}
                  </Flex>,
                  <Flex direction="column" gap="small">
                    {files.map(file => (
                      <CodeBlock key={file} code={cssImport(file)} language="css" inline margin="none" showLabel={false} />
                    ))}
                  </Flex>,
                  <Flex direction="column" gap="small">
                    {files.map(file => (
                      <CodeBlock key={file} code={jsImport(file)} language="js" inline margin="none" showLabel={false} />
                    ))}
                  </Flex>,
                ],
              },
            ],
          },
        ]}
      />
    ) : null}
  </Flex>
)

export default ResetDemoItem
