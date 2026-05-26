[2026-05-26 03:00] major: Scalarize all per-prop responsive shapes; route responsive overrides through the `breakpoints` prop. Internal pipeline cleanup.

`FlexProps` props no longer accept `Breakpoints<T>` wrapping — every layout prop is a single scalar value:
- `gap`, `direction`, `alignItems`, `justifyContent`, `grow`, `shrink`, `wrap` — scalar
- `spacing` — scalar shorthand string only (was `FlexSpacingType` union)

Type renames + removals:
- `FlexSpacingShorthandType` → `FlexSpacingType` (the new canonical scalar)
- Removed: `FlexSpacingResponsiveType` (responsive shape no longer accepted)
- Removed: old `FlexSpacingType = SpacingType` (name now points to the scalar)
- Removed: legacy `SpacingShorthand` / `SpacingResponsive` top-level + namespace aliases
- Dropped `SpacingResponsiveType` and `SpacingType` imports from nice-react-styles

Service removals:
- `isResponsiveObject` deleted (no longer reachable from the new scalar-only public API; its sole remaining consumer `getSpacingValue` was simplified)
- `package.exports.json` services entry no longer lists `isResponsiveObject`

Internal pipeline cleanup:
- `normalizeProps` drops the `typeof value !== "object"` check — always wraps the scalar into `{ phone: value }`
- `getBreakpointValue` narrowed: signature accepts the normalized `{ phone?, tablet?, laptop?, desktop? }` shape only; `isResponsiveObject` import + branch removed
- `getSpacingValue` accepts scalar shorthand only; responsive-object branch removed
- JSDoc clarified in `styleFlex.ts` and `Flex.styles.ts` — example shapes describe the post-`normalizeProps` internal contract, not consumer API

Consumer migration: `<Flex gap={{ phone, tablet }}>` style → `<Flex gap="…" breakpoints={{ "tablet+": { gap: "…" } }}>`. All in-tree call sites already updated.

[2026-05-26 02:15] minor: Add shrink prop to Flex — Breakpoints<number> shape mirroring grow; emits flex-shrink at every breakpoint via the existing styleFlex pipeline.
