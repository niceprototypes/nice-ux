export interface StoryFooterItem {
  /** Story id to navigate to (the `--docs` id from the page's Meta title). */
  id: string
  /** Short label shown after "Go back to" / "Continue to". */
  label: string
}

/**
 * Ordered navigable sequences. StoryFooter finds the current page in one of
 * these and renders back/next buttons to its neighbours. A page that isn't in
 * any sequence renders no nav. Add more sequences here as needed.
 *
 * Keep each sequence in sidebar order (mirror `.storybook/preview.tsx`
 * `storySort`). The `id`s use the `·`-preserving slug Storybook generates from
 * the page's `<Meta title>` (e.g. "Getting started/1 · Tokens").
 */
export const sequences: StoryFooterItem[][] = [
  // Getting started — the guided tutorial flow.
  [
    { id: "getting-started-welcome--docs", label: "Welcome" },
    { id: "getting-started-1-·-tokens--docs", label: "Tokens" },
    { id: "getting-started-2-·-fonts--docs", label: "Fonts" },
    { id: "getting-started-3-·-icons--docs", label: "Icons" },
    { id: "getting-started-4-·-breakpoints--docs", label: "Breakpoints" },
    { id: "getting-started-5-·-themes--docs", label: "Themes" },
    { id: "getting-started-6-·-advanced--docs", label: "Advanced" },
    { id: "getting-started-final--docs", label: "Final" },
  ],
  // Tokens — the token reference pages. Landing page first, then each token
  // group in sidebar order (alphabetical, mirroring the Tokens sidebar).
  [
    { id: "tokens--docs", label: "Tokens" },
    { id: "tokens-animationduration--docs", label: "animationDuration" },
    { id: "tokens-animationeasing--docs", label: "animationEasing" },
    { id: "tokens-backgroundcolor--docs", label: "backgroundColor" },
    { id: "tokens-bordercolor--docs", label: "borderColor" },
    { id: "tokens-borderradius--docs", label: "borderRadius" },
    { id: "tokens-borderwidth--docs", label: "borderWidth" },
    { id: "tokens-boxshadow--docs", label: "boxShadow" },
    { id: "tokens-cellheight--docs", label: "cellHeight" },
    { id: "tokens-color--docs", label: "color" },
    { id: "tokens-fontfamily--docs", label: "fontFamily" },
    { id: "tokens-fontsize--docs", label: "fontSize" },
    { id: "tokens-fontweight--docs", label: "fontWeight" },
    { id: "tokens-gap--docs", label: "gap" },
    { id: "tokens-lineheight--docs", label: "lineHeight" },
  ],
]
