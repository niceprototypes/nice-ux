# Stale first

When something that worked moments ago breaks, especially right after your own rename, move or dependency change, rule out stale state before reading source. Debugging non-bugs is the largest token sink on record.

| # | Suspect | Tell | Check |
|---|---|---|---|
| 1 | Browser tab | worked seconds ago, no logic changed | hard reload |
| 2 | Dev server / Vite cache | you renamed or moved a file; "does not provide export Y" | restart; Storybook `prestorybook` clears `node_modules/.vite` |
| 3 | Dependencies | you changed a package.json | `pnpm install` at the root |
| 4 | Built output | a consumer reads `dist/` | `pnpm --filter @niceprototypes/{name} build` |
| 5 | **The input never arrives** | "X isn't changing" | log the value at the boundary |
| 6 | Your own diff | you edited anything this session | `git diff` |
| 7 | Call site, then the file, then the package asked about | — | read in that order |
| 8 | A foundation package | everything above cleared | Gate A, then owner approval |

Do not enter a step until the one above it is answered. Step 5 is the rule in one line: confirm the input arrives before explaining the mechanism. A `??`/`||` fallback on an input you added turns "never passed" into "silently wrong".

- **Gate A:** a diagnosis that points outside the file you were asked about needs one runtime observation before any edit. Reading many files is a hypothesis with citations.
- **Gate B:** a piece of your explanation that does not fit is a stop condition. Name it and get the observation that settles it.
- A diagnosis more interesting than the symptom is a smell.
