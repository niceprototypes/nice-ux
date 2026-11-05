---
"@niceprototypes/input": minor
---

Input `as="textarea"`: `maxRows` caps growth in lines (scrolls past it, no resize handle) and `onSubmit(value, event)` submits on Enter without Shift, outside IME composition, after `onKeyDown` unless it prevented default.
