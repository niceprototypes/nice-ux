---
"@niceprototypes/image": minor
---

Add `thumbnail` (a data URI painted blurred, or a URL, on the same element until the full image loads; `false` opts out), and `loading`/`fetchPriority` passthrough to Image; the img now decodes async. Pair with `nicely thumbnails <dir>` from @niceprototypes/toolkit, which writes 16px thumbnails and aspect ratios keyed by public path.
