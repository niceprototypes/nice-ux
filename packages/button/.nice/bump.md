[2026-09-14 22:30] major: Remove getButtonToken export and src/tokens wrappers — component tokens are read with getToken(name, variant, { prefix: "button" }) from @niceprototypes/styles
[2026-09-16 15:11] patch: getToken call sites migrated to the token address form
[2026-09-17 14:34] minor: borderColor accepts the object form — { name, transform } for channel-adjusted colours, resolved through resolveColorProp
[2026-09-17 15:48] patch: Filled status buttons now take their border from the fill colour. The block comment already documented this ('that color fills the background and border'), but border-color read from the borderColor group unconditionally, so a filled success button drew a saturated green fill inside a pale hsla(146, 55%, 88%) separator tint — a visible seam around what should be one solid shape. Unfilled buttons are unchanged and keep the borderColor tints, including the disabled base fallback.
[2026-09-18 12:23] minor: Buttons are content-width at every breakpoint. width: 100% was set unconditionally and only relaxed to auto in a tablet+ block, so every button spanned its container below 641px — including square icon-only buttons, which had no label to justify the width. The tablet+ override is removed along with the getBreakpoint import it needed. BREAKING for any layout that relied on mobile buttons filling their container; those now need an explicit width.
[2026-09-18 16:36] patch: Filled buttons take a transparent border instead of repeating the fill colour. The background paints to the border box, so the fill already shows through a transparent border — the second colour lookup was redundant.
[2026-09-24 17:59] minor: Accept a ref on Button, forwarded to the rendered button, anchor, or div root
[2026-09-24 17:59] patch: Show a token-driven keyboard focus outline on Button via :focus-visible
[2026-09-24 19:44] patch: Disable Button natively when disabled or status="disabled": the <button> gets the disabled attribute, anchors and divs get aria-disabled with tabIndex -1, and the disabled prop takes the disabled colouring
[2026-09-24 19:44] patch: Type onMouseEnter and onMouseLeave events for the div root rendered by as="div"
[2026-09-24 19:45] minor: Accept aria-expanded, aria-haspopup, aria-controls, and aria-pressed on Button, forwarded to the root element
[2026-09-25 18:41] minor: Add a grow prop to Button that sets flex-grow on the root
[2026-09-25 18:59] patch: Move element attribute logic into Button.helpers and icon rendering into an internal ButtonIcon component
[2026-09-25 19:12] patch: Declare nice-* runtime packages as peer dependencies with a file: devDependency for local builds
[2026-10-08 22:00] minor: Add ghost (transparent background and border at rest, or per interaction state), color and iconColor (one color token or one per state), justifyContent (icon and label placement; non-center stretches the content row) and animationDuration (transitions from button.animationDuration tokens; none turns them off)
[2026-10-08 22:00] patch: Icon color follows the button.icon.color hover, focus and active tokens; transitions read button.animationDuration and animationEasing tokens instead of a fixed 0.15s ease-in-out
[2026-10-15 15:30] minor: Add a selected prop: a persistent selected look that overrides ghost in every state and, unfilled, takes its border from the button.selected.borderColor token (filled keeps a transparent border; an explicit borderColor still wins); it sets no ARIA attribute
[2026-10-15 15:30] minor: Forward role, aria-selected, tabIndex and id to the root element; role and tabIndex override as="div"'s role="button" and tabIndex 0, and a disabled button keeps tabIndex -1 or its native disabled
[2026-10-15 15:30] minor: iconLeft and iconRight accept any name Icon's name prop accepts, including vendor (Lucide) names with iconVendor
[2026-10-15 15:30] patch: The focus-visible outline reads the button.focusRing width, color and offset tokens instead of the core tokens (same values)
[2026-10-15 15:38] patch: Reset border, background and padding in the inlined layout, so an inlined native <button> renders like an inlined anchor or div instead of showing the browser's outset border and grey fill
[2026-10-15 15:38] minor: Forward aria-current to the root element, and form (the id of the form to submit) to the native <button>
[2026-10-15 15:42] patch: README rewritten for the current API
