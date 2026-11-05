# @niceprototypes/code

> **Responsive props:** Every prop accepts per-breakpoint overrides via the `breakpoints` array. See [withBreakpoints](https://niceprototypes.com/ui/?path=/docs/basics-breakpoints--docs).

A syntax-highlighted code block component for React. Renders a code string as [Shiki](https://shiki.style) HTML coloured by the `code.syntaxColor` tokens (day/night via the `[data-theme]` cascade), with a copy icon (named "Copy {language}" for screen readers; Enter or Space copies too), click-to-copy, and a `maxHeight` collapse with a drag bar (a separator: drag it, or use the arrow keys, Home and End, to show between the cap and the full code). `inlined` renders a chip for code inside a line of text (`code.inline.paddingBlock` / `paddingInline`, in em) with a "Copy to clipboard" tooltip. The `copyToClipboard(text)` service copies text the same way (trailing newline stripped). Part of the Nice Prototypes ecosystem.

Documentation for this package has moved to **[Storybook](https://niceprototypes.com/ui/)**.
