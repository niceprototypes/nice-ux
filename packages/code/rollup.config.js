import { createConfiguration } from "nice-config-rollup"

// @shikijs/* are runtime dependencies but must be externalized, not bundled
// (Shiki is large and self-contained). The shared externals matcher only
// subpath-externalizes nice-* and peerDependencies; additionalExternals is an
// EXACT-match list, so every subpath import used in src/utilities/highlightCode.ts
// is enumerated here. Update this list if the highlighted langs/themes change.
export default createConfiguration({
  additionalExternals: [
    "@shikijs/core",
    "@shikijs/engine-javascript",
    "@shikijs/langs/tsx",
    "@shikijs/langs/css",
    "@shikijs/langs/bash",
    "@shikijs/langs/html",
    "@shikijs/langs/json",
    "@shikijs/themes/min-light",
    "@shikijs/themes/min-dark",
  ],
})
