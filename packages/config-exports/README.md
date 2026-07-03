# nice-config-exports

The package export generator for the `nice-*` ecosystem — generates a component
package's `src/index.ts` from a declarative `package.exports.json`. Split out of
`nice-configuration`.

## Usage

```bash
nice-generate-exports .        # generate src/index.ts from package.exports.json
npm run generate-exports       # same, via the package script
```

Point `package.exports.json` at the schema:

```json
{
  "$schema": "../config-exports/src/schema.json",
  "description": "…",
  "default": "Typography",
  "components": ["Typography"],
  "tokens": ["Typography"]
}
```

## Exports

| Export | Purpose |
|--------|---------|
| bin `nice-generate-exports` | CLI: generate `src/index.ts` from `package.exports.json` |
| `nice-config-exports` (`.`) | `generate`, `generateIndexContent`, `validateConfig`, type `ExportsConfig` |
| `nice-config-exports/schema.json` | JSON schema for `package.exports.json` |

TypeScript source is compiled to `dist/` (`npm run build`). The built `dist/` is
committed so consumers get the `nice-generate-exports` bin without a post-install
build step (no `prepare` hook — see the ecosystem's forbidden-`prepare` rule).
