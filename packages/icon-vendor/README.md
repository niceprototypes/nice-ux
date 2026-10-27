# @niceprototypes/icon-vendor

Vendor icon resolver for [@niceprototypes/icon](https://github.com/niceprototypes/nice-react-icon). Resolves names outside the built-in @niceprototypes/icon set to [Lucide](https://lucide.dev/icons/) icons, so `@niceprototypes/icon` itself never imports a third-party icon set.

## Installation

```bash
npm install @niceprototypes/icon @niceprototypes/icon-vendor
```

Peer dependencies: `@niceprototypes/icon`, `react`. Lucide is a regular dependency of this package.

## Usage

Import the package once, at the app entry. The import is a side effect: it calls `registerVendorResolver(resolveVendorIcon)` from @niceprototypes/icon. Nothing needs to be bound from it.

```tsx
// main.tsx
import "@niceprototypes/icon-vendor"
```

Then pass a Lucide name with the `vendor` flag:

```tsx
import Icon from "@niceprototypes/icon"

<Icon name="Pencil" vendor />
<Icon name="TrendingDown" vendor size="large" color="error" />
```

Components that render an icon by name take the same flag, e.g. Button: `<Button iconLeft="Pencil" iconVendor>Edit</Button>`.

## Names

- Lucide's PascalCase component names (`TrendingDown`, `Pencil`), not the kebab-case file names (`trending-down`).
- A name Lucide does not have resolves to `null`, and `Icon` renders its `circle` fallback.
- Built-in @niceprototypes/icon names are checked first; the vendor resolver is used only when the name is not built in and `vendor` is set.
- Without the side-effect import, `vendor` names render the `circle` fallback.

## API

| Export | Purpose |
|---|---|
| `resolveVendorIcon(name)` | Returns a React component for a Lucide name, or `null`. Registered on import; exported for direct use. |

Allowed values of @niceprototypes/icon props (resolved unions): `~/nice/manifest/agents/catalog.json` → `@niceprototypes/icon`.

## License

MIT
