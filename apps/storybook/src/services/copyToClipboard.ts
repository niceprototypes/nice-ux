/**
 * Copy text to the clipboard via the async Clipboard API. A trailing newline is
 * stripped so single-line snippets copy clean.
 *
 * Shared affordance: the shiki CodeBlock and the ClickToCopy wrapper both call
 * this, so a code block and a plain Typography cell copy identically.
 */
export function copyToClipboard(text: string): void {
  navigator.clipboard.writeText(text.replace(/\n$/, ""))
}
