[2026-07-27 13:42] patch: Adopt size token rename in Input styles and types
[2026-09-14 19:40] major: Align Input to Button's token model — status = base|disabled|error|success|warning (replaces state), filled boolean replaces status primary|secondary, colors resolve from core color/backgroundColor/borderColor; borderRadius adds none/smaller/larger; remove getStatusToken
[2026-09-14 22:30] major: Remove getInputToken export and src/tokens wrappers — component tokens are read with getToken(name, variant, { prefix: "input" }) from @niceprototypes/styles
[2026-09-16 15:11] patch: getToken call sites migrated to the token address form
[2026-09-24 17:41] patch: Paint filled inputs on the raised background token
[2026-09-24 18:41] major: Render Input as field chrome around an input/select/textarea — wrapper owns border, background, width and focus ring; className/style move to the wrapper; add ref, as, start/end slots, width, rows, inputMode, enterKeyHint, spellCheck, dir, dirName; 16px font floor
[2026-09-24 19:01] major: Input backgroundColor and borderColor take the ColorTokenProp contract (a BackgroundColorType / BorderColorType variant or { name, theme, breakpoint, inverse, transform }) resolved through input.backgroundColor / input.borderColor; raw CSS strings are no longer accepted
[2026-09-24 19:02] patch: Input width 2–20 adds the size-specific inline padding and border to the content-only input.width token, so the field holds that many characters at every size; full stays 100%
[2026-09-24 19:04] minor: Input reads the enclosing Field through useField: the native control takes the Field id (unless id is passed), merges the Field description/error ids ahead of its own aria-describedby, sets aria-invalid="true" only when the Field is invalid, and is required when the Field is; adds the @niceprototypes/field dependency
[2026-09-24 20:04] minor: Accept role, aria-expanded, aria-controls, aria-activedescendant, aria-haspopup and aria-autocomplete on Input's native control
[2026-09-24 20:04] patch: Do not emit placeholder on the native select
[2026-09-25 19:12] patch: Declare nice-* runtime packages as peer dependencies with a file: devDependency for local builds
[2026-10-08 22:00] minor: Add ghost: a transparent background and border, true until focused or per state (rest, hover, focus)
[2026-10-08 22:00] patch: Focus colors the field border with input.focusRing.color for mouse and keyboard focus alike, replacing the keyboard-only outline ring; the font family reads the input.fontFamily token
[2026-10-15 15:23] patch: Ghosted focus keeps a focus outline from the input.focusRing tokens
[2026-10-15 15:24] minor: Add a disabled prop to Input, combined with status="disabled" as in Button
[2026-10-15 15:38] patch: Show the error status inside an invalid Field
