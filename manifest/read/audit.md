# Audits

Package source is the truth: when a doc, story or consumer disagrees with the code, the code wins, unless the audit finds a code bug (a separate finding). Findings become `backlog.md` rows; a long write-up goes to `~/nice/surveys/notes/{slug}.md`. A bare "audit" with no type: list the types below and ask which.

## Coverage (`storybook audit`)

Per component, against `agents/catalog.json`:
- one `Playground` story (`catalog.json` → `playground`; the generator prints how many lack one);
- every prop reachable through Controls/args, with token unions as select options typed `satisfies readonly {Union}[]`;
- a UI test per prop and state;
- galleries only where comparison is the point (type styles, colours, tokens); per-prop gallery pages are findings.

## Consumers (`audit {project}`, `audit all consumers`)

- Every element Nice covers goes through its component: no raw `<img>` (use `Image`), text through `Ink`, layout through `Flex`. Each raw element is a finding.
- Valid API use: no invented token variants, no removed props, no hand-written `var(--np--…)` (use `getToken`), no literal sizes.
- Instance queries ("Images without alt or thumbnail, with file:line"): the planned instance index (`.nice/instances.json`, design in `~/nice/surveys/notes/instance-location.md`) is not built. Until it is, use an AST query (ast-grep or ts-morph) scoped to `@niceprototypes/*` imports; never grep JSX.

## Manifest (`manifest audit`)

Every manifest claim (names, paths, APIs, conventions) checked against the code, and code patterns missing from the manifest. Categories: docs wrong → fix the manifest; code violates a deliberate pattern → backlog row; ambiguous → survey.

## Golden KPIs

Paired benchmarks that prove Nice's token savings: the same task on a control (non-Nice) site and on a Nice site, in design, engineering, maintenance and debugging (example: list every image missing alt or thumbnail on a large site).
- Inputs fixed per pair: prompt, model id, effort, clean config, done-condition.
- Measure tokens from transcript usage (`discipline/manager.md` → Status block) and wall-clock time; N ≥ 3 runs per arm, report the median and range.
- Results go in `benchmarks/` at the nice-ux root (backlog row 85), one row per run: task, arm, tokens, time, done-condition met.
