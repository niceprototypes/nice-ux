/** Every `var(--np--…)` reference in a value, including those inside a `calc(…)` — global, for `matchAll`. */
export const VAR_REFERENCE = /var\(--np--[^)]+\)/g

/** A core-token reference anywhere in a value — a bare `var(--np--…)` or one nested in `calc(...)`. */
export const CORE_TOKEN_REFERENCE = /var\(\s*--np--/