[2026-06-09 02:35] patch: Update getStatusToken path order to [status, type, property, state] to match nice-styles' reordered status tokens. Rendered output unchanged.
[2026-06-12 16:37] patch: Color the icon with the link token to match the text when link is true, instead of leaving it pinned to lightest.
[2026-06-12 16:37] minor: Add a weight prop that sets the button label's font weight, forwarded to Typography.
[2026-06-19 19:44] patch: Migrate getToken-family calls to the options-object signature (nice-styles major). Internal refactor — rendered output unchanged; rebuild required for dependents.
[2026-06-21 21:06] patch: Drive border-width and border-color from button component tokens (getButtonToken) instead of the core tokens, so they can be overridden per-subtree via --np--button--border-*. Rendered output unchanged at defaults
[2026-06-27 16:05] patch: Migrate the getBreakpoint call to the new nice-styles +/- key grammar (getBreakpoint(`${BREAKPOINT_TABLET}+`)). Internal — rendered output unchanged.
