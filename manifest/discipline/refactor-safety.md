# Refactor safety

Every save leaves the package compiling. Storybook, `tsc` and the dev server watch the tree, so intermediate states matter, not only the final one.

**A name never points at nothing:** at every save, each reference and its referent both exist.

| Direction | Order |
|---|---|
| Adding (prop, export, token, file) | Referent first, complete: prop typed and implemented; token in source and emitted; export in the barrel; file at its final path. Then the consumers. |
| Removing | Every reference first (calls, JSX, CSS `var()`), then the import, then the definition. |
| Replacing or renaming | Add the new symbol beside the old, migrate every consumer, delete the old. Never `replace_all`. |
| Splitting a file | New files first, old file re-exports them, migrate consumers, delete the old file. Top-level side effects move before the old file goes. |
| Moving a file | `git mv`, update importers in the same step, `grep` the old path before committing. |

Before the first edit of a multi-save change, write the order in one line (`order: type+impl → consumers`). Check it again before any delete. A broken intermediate is acceptable only when the owner authorized a flag-day cutover, or nothing is watching and the window is under one save.
