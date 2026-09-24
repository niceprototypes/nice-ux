[2026-07-27 13:42] patch: Adopt size token rename in Input styles and types
[2026-09-14 19:40] major: Align Input to Button's token model — status = base|disabled|error|success|warning (replaces state), filled boolean replaces status primary|secondary, colors resolve from core color/backgroundColor/borderColor; borderRadius adds none/smaller/larger; remove getStatusToken
[2026-09-14 22:30] major: Remove getInputToken export and src/tokens wrappers — component tokens are read with getToken(name, variant, { prefix: "input" }) from nice-react-styles
[2026-09-16 15:11] patch: getToken call sites migrated to the token address form
[2026-09-24 17:41] patch: Paint filled inputs on the raised background token
