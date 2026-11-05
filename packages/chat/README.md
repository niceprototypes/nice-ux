# @niceprototypes/chat

Chat UI parts built on Scroll, Input and Button.

- `ChatLog`: a `<Scroll follow>` with `role="log"`. It stays at the end while messages arrive and replies stream in, releases when the reader scrolls up, and shows a "Scroll to latest" button while not at the end. `streaming` sets `aria-busy`.
- `ChatMessage`: `role="user"` is an end-aligned bubble (`chat.message.*:user`); `role="assistant"` is full width with no bubble, so its children (e.g. `<Markdown>`) read as a document. The `actions` row shows on hover and focus within, always on the last message, and not while `status="streaming"`. `status="error"` colours the text.
- `ChatComposer`: `Input as="textarea" rows={1}` growing to `maxRows` (`chat.composer.maxRows` by default). Enter sends, Shift+Enter inserts a newline; blank text is not sent. While `busy` the send button is a stop button, and Escape calls `onStop`. `disabled` disables all of it.
- `ChatSuggestions`: one rounded Button per item in a wrapping Flex; `onPick` receives the item.
- `ChatCopyAction`: a copy-icon Button for a message's `actions`, through `copyToClipboard` from @niceprototypes/code.

## Install

```sh
npm install @niceprototypes/chat
```

Peer dependencies: `@niceprototypes/button`, `@niceprototypes/code`, `@niceprototypes/flex`, `@niceprototypes/input`, `@niceprototypes/scroll`, `@niceprototypes/styles`, `react`, `react-dom`, `styled-components`.

## Usage

```tsx
import { ChatComposer, ChatCopyAction, ChatLog, ChatMessage } from "@niceprototypes/chat"
import Markdown from "@niceprototypes/markdown"

<ChatLog aria-label="Conversation" streaming={busy}>
  {messages.map(message => (
    <ChatMessage
      key={message.id}
      role={message.role}
      status={message.status}
      actions={<ChatCopyAction text={message.text} />}
    >
      <Markdown>{message.text}</Markdown>
    </ChatMessage>
  ))}
</ChatLog>
<ChatComposer value={draft} onChange={setDraft} onSubmit={send} onStop={stop} busy={busy} />
```

Props and their types: `jq '.packages[].components[]|select(.name|startswith("Chat"))' manifest/agents/catalog.json`.
