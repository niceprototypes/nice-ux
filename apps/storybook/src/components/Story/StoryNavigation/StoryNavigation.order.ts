export interface StoryNavigationItem {
  /** Story id to navigate to (the `--docs` id from the page's Meta title). */
  id: string
  /** Short label shown after "Go back to" / "Continue to". */
  label: string
}

/**
 * Ordered navigable sequences. StoryNavigation finds the current page in one of
 * these and renders back/next buttons to its neighbours. A page that isn't in
 * any sequence renders no nav. Add more sequences here as needed.
 *
 * Keep each sequence in sidebar order (mirror `.storybook/preview.tsx`
 * `storySort`). The `id`s use the `·`-preserving slug Storybook generates from
 * the page's `<Meta title>` (e.g. "Basics/Tokens").
 */
export const sequences: StoryNavigationItem[][] = [
  // Basics — the guided tutorial flow, continuing into the Scenarios
  // section (the culminating easy/medium/hard examples).
  [
    { id: "basics-welcome--docs", label: "Welcome" },
    { id: "basics-reset--docs", label: "Reset" },
    { id: "basics-tokens--docs", label: "Tokens" },
    { id: "basics-fonts--docs", label: "Fonts" },
    { id: "basics-icons--docs", label: "Icons" },
    { id: "basics-breakpoints--docs", label: "Breakpoints" },
    { id: "basics-themes--docs", label: "Themes" },
    { id: "scenarios-easy--docs", label: "Easy" },
    { id: "scenarios-medium--docs", label: "Medium" },
    { id: "scenarios-hard--docs", label: "Hard" },
  ],
  // Tokens — the token reference pages. Landing page first, then each token
  // group in sidebar order (alphabetical, mirroring the Tokens sidebar).
  [
    { id: "tokens--docs", label: "Tokens" },
    { id: "tokens-animationduration--docs", label: "animationDuration" },
    { id: "tokens-animationeasing--docs", label: "animationEasing" },
    { id: "tokens-borderradius--docs", label: "borderRadius" },
    { id: "tokens-borderwidth--docs", label: "borderWidth" },
    { id: "tokens-boxshadow--docs", label: "boxShadow" },
    { id: "tokens-colors--docs", label: "Colors" },
    { id: "tokens-fontfamily--docs", label: "fontFamily" },
    { id: "tokens-fontsize--docs", label: "fontSize" },
    { id: "tokens-fontweight--docs", label: "fontWeight" },
    { id: "tokens-gap--docs", label: "gap" },
    { id: "tokens-lineheight--docs", label: "lineHeight" },
    { id: "tokens-size--docs", label: "size" },
  ],
]
