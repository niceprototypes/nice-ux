# How the table components relate

No class inheritance. `DataSection` is the base table engine; the other four are
config wrappers that **render `<DataSection>`** with their own columns + rows.

```mermaid
flowchart TD
  TokenTables -->|renders| DataSection
  ComponentExamples -->|renders| DataSection
  ComponentTokensTable -->|renders| DataSection
  IconsDataTable -->|renders| DataSection

  DataSection --> DataSectionTable
  DataSectionTable --> DataSectionHeader
  DataSectionTable --> DataSectionRow
  DataSectionRow --> DataSectionCell
  DataSectionCell --> CodeBlock
  DataSectionCell --> Typography

  TokenName -->|name cell used by| TokenTables
  TokenName --> ComponentExamples
  TokenName --> ComponentTokensTable
```

- **DataSection** — base engine: Table → Header + Row → Cell.
- **TokenTables / ComponentExamples / ComponentTokensTable / IconsDataTable** — siblings; each just passes a different `columns` + `rows` into `DataSection`.
- **TokenName** — the shared "name" cell reused by three of them.