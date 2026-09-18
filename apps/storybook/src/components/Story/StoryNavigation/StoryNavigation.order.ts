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
  // Tokens — the token reference pages. Landing page first, then the grouped
  // folders alphabetically, then the flat pages — mirroring the `storySort`
  // order in `.storybook/preview.tsx`, which pins Docs and the folders ahead of
  // the wildcard.
  [
    { id: "tokens--docs", label: "Tokens" },
    { id: "tokens-animation-animationduration--docs", label: "animationDuration" },
    { id: "tokens-animation-animationeasing--docs", label: "animationEasing" },
    { id: "tokens-borders-borderradius--docs", label: "borderRadius" },
    { id: "tokens-borders-borderwidth--docs", label: "borderWidth" },
    { id: "tokens-colors-backgroundcolor--docs", label: "backgroundColor" },
    { id: "tokens-colors-bordercolor--docs", label: "borderColor" },
    { id: "tokens-colors-brandcolor--docs", label: "brandColor" },
    { id: "tokens-colors-color--docs", label: "color" },
    { id: "tokens-colors-transformcolor--docs", label: "transformColor" },
    { id: "tokens-fonts-fontfamily--docs", label: "fontFamily" },
    { id: "tokens-fonts-fontsize--docs", label: "fontSize" },
    { id: "tokens-fonts-fontweight--docs", label: "fontWeight" },
    { id: "tokens-fonts-letterspacing--docs", label: "letterSpacing" },
    { id: "tokens-fonts-lineheight--docs", label: "lineHeight" },
    { id: "tokens-sizes-backgroundsize--docs", label: "backgroundSize" },
    { id: "tokens-sizes-gap--docs", label: "gap" },
    { id: "tokens-sizes-size--docs", label: "size" },
    { id: "tokens-boxshadow--docs", label: "boxShadow" },
    { id: "tokens-zindex--docs", label: "zIndex" },
  ],
]
