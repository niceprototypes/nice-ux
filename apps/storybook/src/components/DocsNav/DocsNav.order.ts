export interface DocsNavItem {
  /** Story id to navigate to (the `--docs` id from the page's Meta title). */
  id: string
  /** Short label shown after "Go back to" / "Continue to". */
  label: string
}

/**
 * Ordered navigable sequences. DocsNav finds the current page in one of these
 * and renders back/next buttons to its neighbours. A page that isn't in any
 * sequence renders no nav. Add more sequences here as needed.
 *
 * Keep each sequence in sidebar order (mirror `.storybook/preview.tsx`
 * `storySort`). The `id`s use the `·`-preserving slug Storybook generates from
 * the page's `<Meta title>` (e.g. "Getting started/1 · Get tokens").
 */
export const sequences: DocsNavItem[][] = [
  // Getting started — the guided tutorial flow.
  [
    { id: "getting-started-welcome--docs", label: "Welcome" },
    { id: "getting-started-1-·-get-tokens--docs", label: "Get tokens" },
    { id: "getting-started-2-·-set-tokens--docs", label: "Set tokens" },
    { id: "getting-started-3-·-themes--docs", label: "Themes" },
    { id: "getting-started-4-·-fonts--docs", label: "Fonts" },
    { id: "getting-started-5-·-responsive--docs", label: "Responsive" },
    { id: "getting-started-6-·-icons--docs", label: "Icons" },
    { id: "getting-started-7-·-settokens--docs", label: "setTokens" },
    { id: "getting-started-final--docs", label: "Final" },
  ],
]
