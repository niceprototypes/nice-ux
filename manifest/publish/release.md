# Commit, version, publish

One repo: `~/nice/nice-ux`. The old per-package repos, `.nice/bump.md` files and `nicely` publishing are retired.

## Commit

- Plain `git commit`; subject = what changed, imperative. Commit only when asked or when the brief says so. Never push without the owner's go-ahead.
- Stage only your paths (`git commit -- {paths}`): other agents work in the same tree. On `index.lock`, wait and retry.
- Before committing package code: `pnpm typecheck`, `pnpm test`, and `pnpm build` for the touched packages (`pnpm --filter @niceprototypes/{name} …`).

## Version

A publishable change adds a changeset in the same commit: `pnpm changeset` (writes `.changeset/*.md`: packages, `major|minor|patch`, one-line summary). Private packages (`config-*` except config-vite and config-crxjs, toolkit, vite-watcher, storybook) take none. Config: `.changeset/config.json` (peer dependents bump only when out of range).

## Publish (owner go-ahead required)

`pnpm changeset version` (applies bumps, writes changelogs), commit, then `pnpm changeset publish` (publishes only versions not yet on npm; `workspace:` ranges become real versions). Never `npm publish` by hand. Scope: `@niceprototypes`, npm user `niceprototypes`.

## Deploy (owner go-ahead required)

Website + Storybook ship together: `cd ~/nice/website && npm run deploy-storybook` (Firebase project `nice-prototypes`, Storybook under `/ui`). Nothing else: no direct `firebase deploy`, no partial deploys. On failure, stop and report.
