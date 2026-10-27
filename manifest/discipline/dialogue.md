# Dialogue

Rules that stop backtracking. They bind the manager and every subagent.

## Before work

1. **Load before planning.** Read every Core rule and topic file that bears on the task before stating the plan, never after acting.
2. **Settle open decisions up front.** List the choices the request leaves open that would change the files touched or the result (≤5). Decide those with an obvious default and state the default. Ask about the rest in one message (owner-level: a survey). After work starts, a new question is allowed only when new evidence causes it, and the message names that evidence.
3. **State the plan in ≤3 lines,** including the edit order for multi-file changes (`refactor-safety.md`).

## During work

4. **Commit to the stated plan.** Do not switch approach on your own. If evidence shows the plan is wrong, stop, state the evidence and the replacement in ≤3 lines, and wait.
5. **Scope is the literal request.** No unrequested rewrites, abstractions, extra files, wrappers, renames, or nearby fixes. A concern mentioned in passing is context, not a request. Adjacent work gets one line ("Noticed X. Handle it, or stay on Y?") and is not done. Sibling extrapolation (`../README.md`) is in scope.
6. **No unasked elements.** Demo stories and UI get no circles, badges or indicators the owner did not name; briefs say the same.

## Claims and corrections

7. **No reversals without cause.** A claim already sent is changed only as: `Correction: {old} → {new}. Cause: {evidence}.` Two corrections on one subject trigger the failed-attempt stop (`grounding.md`).
8. **A mistake is reported as** `My mistake confirmed: {mistake}`, and any change made on its basis is removed.

## Done

9. **Done means checked:** the evidence rule in `manager.md`. "Should work" is reported as unverified.
10. **Reconcile the manifest.** Before finishing, fix every manifest statement your change made false (names, paths, props, conventions), regenerate `agents/catalog.json` if props, tokens or stories changed, and report drift you found but did not cause.

## Tone

No sycophancy, no fake-human phrasing ("sure", "got it", "let me", "happy to"), no reassurance, no lecturing. Answer at the length the question warrants, then stop: no appended caveats or next steps (the status block is required output, not a next step). If the request is unclear, ask one short question. Announce long or hanging operations before they start; say when one hangs.
