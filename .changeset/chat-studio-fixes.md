---
"@niceprototypes/scroll": patch
"@niceprototypes/chat": patch
---

Scroll: `follow` jumps to the end instantly when the end moves, so a streamed reply no longer trails it; a change that leaves the end in place does not scroll. Chat: ChatComposer's send and stop buttons are `smaller` unfilled end-slot buttons, centred on the field's line and kept at its bottom as it grows; a user ChatMessage keeps its line breaks.
