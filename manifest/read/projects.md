# Projects

## Storybook — `apps/storybook` (`@niceprototypes/storybook`, private)

Storybook 10, Vite, React 19, styled-components 6. Reads workspace packages; no linking.

- `.storybook/main.ts` Vite config (dedupe react, react-dom, styled-components, styles, icon); `preview.tsx` sidebar order (`storySort`).
- `stories/Components/{Component}/` component stories; `stories/Tokens/` generated token galleries (`scripts/generate-token-stories.mjs`); `stories/Configuration/` build docs.
- `src/` Storybook-only story components; the data and docs tables live in `@niceprototypes/docs` (`scripts/check-data.ts` validates `packages/docs/src/data/storybook.json`).
- Run: `pnpm storybook` at the root (port 6006). Build: `pnpm build-storybook`.

## Nice docs — `apps/docs` (`@niceprototypes/docs-site`, private)

The custom docs site replacing Storybook (phase 1), on `@niceprototypes/app` (docs-only: `pages` built from data, no scenes). Vite, React 19.

- `src/pages.tsx` the nav: Tokens, then every component with a Storybook docs page in `manifest/agents/catalog.json`.
- `src/components/` DocsPage (sections column + Contents), ComponentPage (catalog props, live examples, tokens), TokensPage (storybook.json token tables), ThemeToggle.
- Docs building blocks (data, token and example tables, headers, code) come from `@niceprototypes/docs` (`packages/docs`, private, source-only, one subpath export per module), shared with the Storybook; `src/tokens.ts` the one unprefixed token map (the Storybook's plus the site's overrides).
- Run: `pnpm --filter @niceprototypes/docs-site dev` (port 6020).

## Website — `~/nice/website` (package `np`, own repo)

CRA 5 via craco, React 19, styled-components 6, React Router 7. Staging ground for nice-ux: done = works on localhost against nice-ux, then production.

- `src/pages/` routes; `src/components/` shared; `src/nice/` local wrappers with token overrides.
- Dev: `npm start`. Deploy: `publish/release.md` → Deploy.
- Until the app switch (backlog, survey 002), its scripts still point at the old `~/nice/storybook` and toolkit (`develop`, `build-storybook`).
