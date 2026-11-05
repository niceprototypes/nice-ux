---
"@niceprototypes/scroll": minor
"@niceprototypes/styles": patch
---

Scroll: a `follow` prop pins the scroll position to the end while the content grows; scrolling up releases the pin, the end pins it again. `useScrollEnd()` inside a `<Scroll follow>` returns `{ atEnd, scrollToEnd(behavior?) }`; `prefers-reduced-motion` makes the scroll instant. Styles: the `scroll.follow.threshold` token (`var(--np--gap)`).
