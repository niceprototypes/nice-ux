# @niceprototypes/chat

## 0.2.0

### Minor Changes

- 3547207: Add @niceprototypes/chat: ChatLog (a `<Scroll follow>` log, `aria-busy` while streaming, a "Scroll to latest" button while not at the end), ChatMessage (user bubble or full-width assistant reply, an actions row on hover, focus within and the last message), ChatComposer (send on Enter, stop on the stop button or Escape while busy, `maxRows`), ChatSuggestions and ChatCopyAction; its `chat.*` component tokens in styles; its re-export from @niceprototypes/ux. Code exports its `copyToClipboard` service.

### Patch Changes

- 04b4ebd: Scroll: `follow` jumps to the end instantly when the end moves, so a streamed reply no longer trails it; a change that leaves the end in place does not scroll. Chat: ChatComposer's send and stop buttons are `smaller` unfilled end-slot buttons, centred on the field's line and kept at its bottom as it grows; a user ChatMessage keeps its line breaks.
- Updated dependencies [3547207]
- Updated dependencies [b35f5fa]
- Updated dependencies [20fc3f3]
  - @niceprototypes/code@0.2.0
