# nice-config-typescript

Shared TypeScript configuration for the `nice-*` ecosystem. Split out of
`nice-configuration`.

## Usage

```json
// tsconfig.json
{
  "extends": "nice-config-typescript/react",
  "compilerOptions": {
    "outDir": "dist",
    "declarationDir": "dist/types"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.test.tsx"]
}
```

## Configs

| Subpath | Extends | Adds |
|---------|---------|------|
| `nice-config-typescript/base` | — | ES2020, ESNext modules, bundler resolution, strict, declaration + declarationMap |
| `nice-config-typescript/react` | `base` | `jsx: react-jsx` |

`typescript` is an optional peer dependency provided by the consuming package.
