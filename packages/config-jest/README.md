# @niceprototypes/config-jest

Shared Jest configuration for the `nice-*` ecosystem. Split out of
`nice-configuration`.

## Usage

```js
// jest.config.js
export { default } from "@niceprototypes/config-jest/react"
```

## Configs

| Subpath | Purpose |
|---------|---------|
| `@niceprototypes/config-jest/react` | `ts-jest` preset, `jsdom` env, ESM support, `nice-*` transform, Testing Library setup |
| `@niceprototypes/config-jest/css-mock` | CSS import mock for `moduleNameMapper` |

Peer dependencies (`jest`, `ts-jest`, `jest-environment-jsdom`,
`@testing-library/jest-dom`, `typescript`) are optional and provided by the
consuming package. Add this package only to packages that actually have tests.
