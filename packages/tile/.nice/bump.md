[2026-05-26 03:00] major: Scalarize `TileMaxWidthType`; spacing prop tightens via `nice-react-flex@major`.

- `TileMaxWidthType = Breakpoints<TileMaxWidthValueType>` → `TileMaxWidthType = TileMaxWidthValueType` (scalar `number | "none"`). For per-breakpoint max-width, use the wrapper's `breakpoints` prop: `breakpoints={{ "laptop+": { maxWidth: 980 } }}`.
- Dropped `Breakpoints` import from `nice-react-styles` (no longer used).
- Tile's `spacing` prop transitively tightens because `FlexSpacingType` (re-exported from nice-react-flex) is now the scalar shorthand. Pass `spacing="small base"` directly; responsive overrides flow through `breakpoints`.

Consumers passing `maxWidth={{ phone, laptop }}` or `spacing={{ phone, tablet }}` shapes will get TypeScript errors and must move those responsive overrides to the `breakpoints` prop.
