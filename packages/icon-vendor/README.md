# nice-react-icon-vendor

Vendor icon resolver for [nice-react-icon](https://github.com/niceprototypes/nice-react-icon). Resolves names outside the built-in nice-icons set to [Lucide](https://lucide.dev/icons/) icons, so `nice-react-icon` itself never imports a third-party icon set.

## Installation

```bash
npm install nice-react-icon nice-react-icon-vendor
```

Peer dependencies: `nice-react-icon`, `react`. Lucide is a regular dependency of this package.

## Usage

Import the package once, at the app entry. The import is a side effect: it calls `registerVendorResolver(resolveVendorIcon)` from nice-react-icon. Nothing needs to be bound from it.

```tsx
// main.tsx
import "nice-react-icon-vendor"
```

Then pass a Lucide name with the `vendor` flag:

```tsx
import Icon from "nice-react-icon"

<Icon name="Pencil" vendor />
<Icon name="TrendingDown" vendor size="large" color="error" />
```

Components that render an icon by name take the same flag, e.g. Button: `<Button iconLeft="Pencil" iconVendor>Edit</Button>`.

## Names

- Lucide's PascalCase component names (`TrendingDown`, `Pencil`), not the kebab-case file names (`trending-down`).
- A name Lucide does not have resolves to `null`, and `Icon` renders its `circle` fallback.
- Built-in nice-icons names are checked first; the vendor resolver is used only when the name is not built in and `vendor` is set.
- Without the side-effect import, `vendor` names render the `circle` fallback.

## API

| Export | Purpose |
|---|---|
| `resolveVendorIcon(name)` | Returns a React component for a Lucide name, or `null`. Registered on import; exported for direct use. |

Allowed values of nice-react-icon props (resolved unions): `~/nice/manifest/agents/catalog.json` → `nice-react-icon`.

## License

MIT
