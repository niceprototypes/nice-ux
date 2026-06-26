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
  // Getting started — the guided tutorial flow. Kitchen sink is the unnumbered
  // final item.
  [
    { id: "getting-started-welcome--docs", label: "Welcome" },
    { id: "getting-started-1-·-tokens--docs", label: "Tokens" },
    { id: "getting-started-2-·-fonts--docs", label: "Fonts" },
    { id: "getting-started-3-·-icons--docs", label: "Icons" },
    { id: "getting-started-4-·-breakpoints--docs", label: "Breakpoints" },
    { id: "getting-started-5-·-themes--docs", label: "Themes" },
    { id: "getting-started-kitchen-sink--docs", label: "Kitchen sink" },
  ],
  // Tokens / Modules — the token reference pages. Landing page first, then each
  // token group in sidebar order (alphabetical, mirroring the Modules sidebar).
  [
    { id: "tokens-modules--docs", label: "Modules" },
    { id: "tokens-modules-animationduration--docs", label: "animationDuration" },
    { id: "tokens-modules-animationeasing--docs", label: "animationEasing" },
    { id: "tokens-modules-borderradius--docs", label: "borderRadius" },
    { id: "tokens-modules-borderwidth--docs", label: "borderWidth" },
    { id: "tokens-modules-boxshadow--docs", label: "boxShadow" },
    { id: "tokens-modules-cellheight--docs", label: "cellHeight" },
    { id: "tokens-modules-colors--docs", label: "Colors" },
    { id: "tokens-modules-fontfamily--docs", label: "fontFamily" },
    { id: "tokens-modules-fontsize--docs", label: "fontSize" },
    { id: "tokens-modules-fontweight--docs", label: "fontWeight" },
    { id: "tokens-modules-gap--docs", label: "gap" },
    { id: "tokens-modules-lineheight--docs", label: "lineHeight" },
  ],
  // Tokens / Components — component-level token reference, one page per
  // component that ships tokens, in sidebar order (alphabetical).
  [
    { id: "tokens-components--docs", label: "Components" },
    { id: "tokens-components-button--docs", label: "Button" },
    { id: "tokens-components-form--docs", label: "Form" },
    { id: "tokens-components-icon--docs", label: "Icon" },
    { id: "tokens-components-image--docs", label: "Image" },
    { id: "tokens-components-input--docs", label: "Input" },
    { id: "tokens-components-lightbox--docs", label: "Lightbox" },
    { id: "tokens-components-tile--docs", label: "Tile" },
    { id: "tokens-components-typography--docs", label: "Typography" },
  ],
]
