# @niceprototypes/chat

## Install

```sh
pnpm add @niceprototypes/chat
```

Peer dependencies and app setup: [Build on Nice](../../manifest/agents/README.md).

## Usage

```tsx
import { ChatComposer, ChatCopyAction, ChatLog, ChatMessage, ChatSuggestions } from "@niceprototypes/chat"
```

Each component also takes `breakpoints`: breakpoint keys to partial props (`BreakpointOverride`, `packages/styles/src/react/services/withBreakpoints`).

## Docs

| Component | Storybook story |
|---|---|
| ChatComposer | `components-chat-chatcomposer--playground` |
| ChatCopyAction | `components-chat-chatcopyaction--playground` |
| ChatLog | `components-chat-chatlog--playground` |
| ChatMessage | `components-chat-chatmessage--playground` |
| ChatSuggestions | `components-chat-chatsuggestions--playground` |

Storybook runs with `pnpm storybook` at the nice-ux root. Props, types, defaults, token addresses and exports: [`manifest/agents/catalog.json`](../../manifest/agents/catalog.json), from the nice-ux root:

```sh
jq '.packages[]|select(.package=="@niceprototypes/chat")' manifest/agents/catalog.json
```

## License

MIT
