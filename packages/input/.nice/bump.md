[2026-07-27 13:42] patch: Adopt size token rename in Input styles and types
[2026-09-14 19:40] major: Align Input to Button's token model — status = base|disabled|error|success|warning (replaces state), filled boolean replaces status primary|secondary, colors resolve from core color/backgroundColor/borderColor; borderRadius adds none/smaller/larger; remove getStatusToken
[2026-09-14 22:30] major: Remove getInputToken export and src/tokens wrappers — component tokens are read with getToken(name, variant, { prefix: "input" }) from nice-react-styles
[2026-09-16 15:11] patch: getToken call sites migrated to the token address form
[2026-09-24 17:41] patch: Paint filled inputs on the raised background token
[2026-09-24 18:41] major: Render Input as field chrome around an input/select/textarea — wrapper owns border, background, width and focus ring; className/style move to the wrapper; add ref, as, start/end slots, width, rows, inputMode, enterKeyHint, spellCheck, dir, dirName; 16px font floor
[2026-09-24 19:01] major: Input backgroundColor and borderColor take the ColorTokenProp contract (a BackgroundColorType / BorderColorType variant or { name, theme, breakpoint, inverse, transform }) resolved through input.backgroundColor / input.borderColor; raw CSS strings are no longer accepted
[2026-09-24 19:02] patch: Input width 2–20 adds the size-specific inline padding and border to the content-only input.width token, so the field holds that many characters at every size; full stays 100%
