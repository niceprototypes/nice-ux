/**
 * JSON for embedding inside an inline <script>: `<` is escaped so no string
 * value (the spinner markup carries `</style>`) can close the script element
 * or open an HTML comment.
 *
 * @param value - JSON-serialisable value
 * @returns JSON text safe inside <script>
 */
export function toScriptJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c")
}
