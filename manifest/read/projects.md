# Projects

## Storybook — `apps/storybook` (`@niceprototypes/storybook`, private)

Storybook 10, Vite, React 19, styled-components 6. Reads workspace packages; no linking.

- `.storybook/main.ts` Vite config (dedupe react, react-dom, styled-components, styles, icon); `preview.tsx` sidebar order (`storySort`).
- `stories/Components/{Component}/` component stories; `stories/Tokens/` generated token galleries (`scripts/generate-token-stories.mjs`); `stories/Configuration/` build docs.
- `src/` shared story components and data (`scripts/check-data.ts` validates it).
- Run: `pnpm storybook` at the root (port 6006). Build: `pnpm build-storybook`.

## Website — `~/nice/website` (package `np`, own repo)

CRA 5 via craco, React 19, styled-components 6, React Router 7. Staging ground for nice-ux: done = works on localhost against nice-ux, then production.

- `src/pages/` routes; `src/components/` shared; `src/nice/` local wrappers with token overrides.
- Dev: `npm start`. Deploy: `publish/release.md` → Deploy.
- Until the app switch (backlog, survey 002), its scripts still point at the old `~/nice/storybook` and toolkit (`develop`, `build-storybook`).
