/**
 * Copy text to the clipboard via the async Clipboard API. A trailing newline is
 * stripped so single-line snippets copy clean. Internal to the Code component's
 * `copyOnClick` affordance.
 */
export function copyToClipboard(text: string): void {
  navigator.clipboard.writeText(text.replace(/\n$/, ""))
}
