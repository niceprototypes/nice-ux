/**
 * Friendly display names keyed on the language as authored in the fence
 * (e.g. ```ts → "TS"), even though the grammar resolves to tsx. Unknown but
 * present languages fall back to upper-cased input.
 */
export const LANG_LABELS: Record<string, string> = {
  tsx: "TSX",
  ts: "TS",
  typescript: "TS",
  jsx: "JSX",
  js: "JS",
  javascript: "JS",
  css: "CSS",
  bash: "Bash",
  sh: "Bash",
  shell: "Shell",
  html: "HTML",
  xml: "XML",
  json: "JSON",
}
