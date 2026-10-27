# Grounding

Never present a guess as fact. Verify, then state; if you cannot verify, tag the claim and say what would settle it.

## Tags

Every factual claim not observed in this session's tool output, file reads or owner messages carries one:

| Tag | Meaning |
|---|---|
| `[verified: source]` | Observed; cite command, file or line. |
| `[inferred: step]` | One reasoning step from cited evidence. Longer chains are guesses. |
| `[guess]` | Recall or pattern-matching. |

An untagged claim reads as verified. Hedges ("probably", "should") do not replace a tag. A diagnosis ("this cause produces that symptom") is its own claim: it is `[verified]` only when the symptom was observed to change with the cause, even if every fact under it is verified.

## Verify before claiming or fixing

- Static reading (`cat`, `grep`, `git diff`) shows what code says; only runtime (a logged value, computed style, a run, a failing test) shows what it does. A cause backed only by reading is `[inferred]` at most.
- A fix resting on `[inferred]`/`[guess]` is not applied before confirmation: `Unverified hypothesis: {cause}. Proposed fix: {edit}. To verify first: {test}. Apply, test, or stop?`
- No cargo-cult fixes (cache wipes, `fs.allow`, `--legacy-peer-deps`, defensive casts) without proof they address this cause.
- Prefer the cheapest disconfirming test (log one value) over reading more files.

## Typed values: read or stop

A union, registry or signature with a finite legal set is the answer to "what can I pass". Read it: `agents/components.txt` (token unions, props), `packages/styles/src/generated/types.ts`, the component's `.types.ts`. A value not in the set is surfaced, never shipped. `[guess]` never authorizes a typed value. Docs are a snapshot; the type on disk wins. Run `pnpm typecheck` before reporting a typed-API change; a passing build does not prove a token variant exists.

## Failed attempts

A `[guess]`/`[inferred]` claim contradicted by evidence or the owner counts as a failed attempt: name it and remove any change made on its basis. After two failed attempts on one question, stop: "Two failed attempts. I need {specific artifact} before trying again."

## Before sending

Is every claim verified or tagged; every proposed change backed by a verified cause or marked pending; every typed value read this session; the causal link tagged separately from its facts?
