import * as React from "react"
import { withBreakpoints } from "nice-react-styles"
import Flex from "nice-react-flex"
import Typography from "../../nice/Typography"
import { DataTable } from "../DataTable"
import { DataTableHeader } from "../DataTable/DataTableHeader"
import { tableHeadingProps } from "./DataTables.headings"
import type {
  DataClusterSection,
  DataSection,
  DataTablesProps,
  DataTablesTitleAs,
} from "./DataTables.types"

/** React key for a section — its id, else its string name, else the index. */
const sectionKey = (section: DataSection, index: number): React.Key =>
  section.id ?? (typeof section.name === "string" ? section.name : index)

/** A section that holds child sections rather than rows. */
const isCluster = (section: DataSection): section is DataClusterSection =>
  "sections" in section && section.sections != null

/** The heading element one level below `parent` (clamped at h4). */
const nextLevel = (parent: DataTablesTitleAs): DataTablesTitleAs =>
  parent === "h1" ? "h2" : parent === "h2" ? "h3" : "h4"

/**
 * The one public table component, over two axes: any number of sections (one =
 * a standalone table) × `layout`.
 *
 * - `layout="aligned"` (default): one shared column header, then each section as
 *   a named table beneath it — its `name` rendered above its rows (not as a
 *   leading column), so every section's data columns line up under the one
 *   header as a continuous table split into named row-groups.
 * - `layout="sectioned"`: each section is independent — its own column header
 *   and its own `name` heading (`h3` by default) — for genuinely separate tables.
 *
 * `title` is the optional overall heading (`h2`) above the whole set, available
 * in either layout and for a single table; each section's `name` is its h3 in
 * sectioned layout. So any instance — one table or many — can carry both levels.
 */
const BaseDataTables = ({
  columns,
  tables,
  layout = "aligned",
  title,
  titleAs = "h2",
  inline = false,
  showHeader = true,
}: DataTablesProps) => {
  const heading = title != null ? <Typography as={titleAs} {...tableHeadingProps(titleAs)}>{title}</Typography> : null

  if (layout === "sectioned") {
    // Render a section (and its heading) at a level one below its parent's,
    // recursing into clusters. Seeded with parentLevel "h2" so a top leaf with
    // no explicit `titleAs` resolves to "h3" — the long-standing default.
    const renderSection = (section: DataSection, parentLevel: DataTablesTitleAs): React.ReactNode => {
      const level = section.titleAs ?? nextLevel(parentLevel)
      const sectionHeading =
        section.name != null ? (
          <Typography as={level} {...tableHeadingProps(level)}>
            {section.name}
          </Typography>
        ) : null

      // Cluster wrappers gap their children (and the cluster heading); a leaf's
      // heading sits directly above its table (no gap), matching prior layout.
      return isCluster(section) ? (
        <Flex direction="column" gap="base">
          {sectionHeading}
          {section.sections.map((child, index) => (
            <React.Fragment key={sectionKey(child, index)}>{renderSection(child, level)}</React.Fragment>
          ))}
        </Flex>
      ) : (
        <Flex direction="column">
          {sectionHeading}
          <DataTable columns={section.columns ?? columns} rows={section.rows} inline={inline} showHeader={showHeader} />
        </Flex>
      )
    }

    return (
      <Flex direction="column" gap="large">
        {heading}
        {tables.map((section, index) => (
          <React.Fragment key={sectionKey(section, index)}>
            {/* A rule between top-level sections, the way `---` reads between MDX blocks. */}
            {index > 0 ? <hr /> : null}
            {renderSection(section, "h2")}
          </React.Fragment>
        ))}
      </Flex>
    )
  }

  // Aligned: one shared column header, then each section as a named table
  // beneath it (its name rendered above its own rows by DataTable). Clusters are
  // a sectioned-only concept, so an aligned set is leaf sections only.
  return (
    <Flex direction="column" gap="base">
      {heading}
      {showHeader ? <DataTableHeader columns={columns} /> : null}
      {tables.map((section, index) =>
        isCluster(section) ? null : (
          <DataTable
            key={sectionKey(section, index)}
            name={section.name}
            rows={section.rows}
            columns={columns}
            inline={inline}
            showHeader={false}
          />
        )
      )}
    </Flex>
  )
}

export const DataTables = withBreakpoints<DataTablesProps>(BaseDataTables)
