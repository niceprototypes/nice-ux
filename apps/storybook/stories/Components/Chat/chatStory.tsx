import { setTokens } from "@niceprototypes/styles"
import Ink from "@niceprototypes/ink"
import Markdown from "@niceprototypes/markdown"
import { ChatCopyAction, ChatMessage } from "@niceprototypes/chat"
import type { ChatMessageStatusType } from "@niceprototypes/chat"

/** The chat column the stories render in: a log above a composer. */
export const getToken = setTokens(
  {
    width: { base: "480px" },
    height: { base: "360px" },
  },
  "chatStory",
)

export const column = { width: getToken("chatStory.width:base"), height: getToken("chatStory.height:base") }

export const QUESTION = "Why does the slide feel stiff?"

export const REPLY = `It starts and stops at full speed. Give it an \`ease-out\` curve:

\`\`\`css
.slide {
  transition: transform 240ms ease-out;
}
\`\`\`

Shorter durations read snappier; keep the fade on the same timing.`

/** The reply as it streams: each step adds the next few words. */
export const STREAM = (() => {
  const words = REPLY.split(/(?<=\s)/)
  const steps = 5
  const chunk = Math.ceil(words.length / steps)
  return Array.from({ length: steps }, (_, index) => words.slice(0, (index + 1) * chunk).join(""))
})()

/** One turn of the scripted exchange. */
export type Turn = { id: string; role: "user" | "assistant"; text: string; status?: ChatMessageStatusType }

/** A user turn as Ink, an assistant turn as Markdown with a copy action. */
export const TurnMessage = ({ role, text, status }: Turn) => (
  <ChatMessage
    role={role}
    status={status}
    actions={role === "assistant" ? <ChatCopyAction text={text} /> : undefined}
  >
    {role === "user" ? <Ink>{text}</Ink> : <Markdown>{text}</Markdown>}
  </ChatMessage>
)

/** A conversation long enough to scroll. */
export const CONVERSATION: Turn[] = Array.from({ length: 4 }, (_, index) => [
  { id: `q${index}`, role: "user" as const, text: QUESTION },
  { id: `a${index}`, role: "assistant" as const, text: REPLY },
]).flat()
